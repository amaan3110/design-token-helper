import * as vscode from 'vscode';
import postcss from 'postcss'
import { Token, propertyMap } from './constant';
import { getCategory, getSettings, getTokenFileName, shouldReplace } from './helpers'

let tokens: Token[] = [];
let isUpdating = false;

export async function activate(context: vscode.ExtensionContext) {
	await loadTokens();

	const pattern = getTokenFileName();
	const watcher = vscode.workspace.createFileSystemWatcher(pattern);

	watcher.onDidChange(loadTokens);
	watcher.onDidCreate(loadTokens);
	watcher.onDidDelete(() => {
		tokens = [];
	});

	const provider = vscode.languages.registerCompletionItemProvider(
		["css", "scss", "less"],
		{
			provideCompletionItems(document, position) {
				return getCompletionItems(document, position);
			}
		},
		"-", "("
	);

	const hoverProvider = vscode.languages.registerHoverProvider(
		["css", "scss", "less"],
		{
			provideHover(document, position) {
				return provideTokenHover(document, position);
			}
		}
	);

	const changeListener = vscode.workspace.onDidChangeTextDocument((event) => {
		const { allowReplaceOnType } = getSettings();
		if (!allowReplaceOnType) return;

		replaceWithToken(event);
	});

	const saveListener = vscode.workspace.onWillSaveTextDocument((event) => {
		const { allowReplaceOnSave } = getSettings();
		if (!allowReplaceOnSave) return;

		event.waitUntil(replaceOnSave(event.document));
	});

	const selectTokenFile = vscode.commands.registerCommand("design-token-setting.selectTokenFile",
		async () => {
			let tokenFile = await vscode.window.showInputBox({
				title: "Design Token Setting",
				prompt: "Enter your design token file name",
				placeHolder: "token.css or tokens.css",
				value: "token.css",
				ignoreFocusOut: true
			});
			if (!tokenFile) {
				vscode.window.showWarningMessage("Token file not configured.");
				return;
			}

			await vscode.workspace.getConfiguration("designTokenSetting")
				.update(
					"tokenFile",
					tokenFile,
					vscode.ConfigurationTarget.Workspace
				);

			vscode.window.showInformationMessage(`Token file changed to ${tokenFile}`);

			await loadTokens();
		});

	const convertCurrentFile = vscode.commands.registerCommand("design-token-setting.convertCurrentFile",
		async () => {
			const editor = vscode.window.activeTextEditor;

			if (!editor) {
				return;
			}

			await convertEntireFile(editor);
		}
	);

	const restartExtension = vscode.commands.registerCommand("design-token-setting.restartExtension",
		async () => {
			const answer = await vscode.window.showInformationMessage(
				"Reload VS Code to restart Design Token Helper?",
				"Reload"
			);

			if (answer === "Reload") {
				await vscode.commands.executeCommand("workbench.action.reloadWindow");
			}
		}
	);

	const reloadTokens = vscode.commands.registerCommand("design-token-setting.reloadTokens",
		async () => {
			await loadTokens();
			vscode.window.showInformationMessage("Design tokens reloaded.");
		}
	);


	context.subscriptions.push(reloadTokens);
	context.subscriptions.push(restartExtension);
	context.subscriptions.push(convertCurrentFile);
	context.subscriptions.push(selectTokenFile);
	context.subscriptions.push(saveListener);
	context.subscriptions.push(changeListener);
	context.subscriptions.push(hoverProvider);
	context.subscriptions.push(provider);
	context.subscriptions.push(watcher);
}

export function deactivate() { }

function getCompletionItems(document: vscode.TextDocument, position: vscode.Position
): vscode.CompletionItem[] {
	const line = document.lineAt(position.line).text;
	const beforeCursor = line.substring(0, position.character);

	const property = beforeCursor.split(":")[0].trim();
	const categories = propertyMap[property];

	// Property not supported
	if (!categories) return [];

	// Filter matching tokens
	const filteredTokens = tokens.filter(token => categories.includes(token.category));

	// Convert to VS Code completion items
	return filteredTokens.map(token => {
		const item = new vscode.CompletionItem(`var(${token.name})`,
			vscode.CompletionItemKind.Variable);

		// What gets inserted
		item.insertText = `var(${token.name})`;
		// Right-side text
		item.detail = token.value;

		// Hover documentation
		item.documentation = new vscode.MarkdownString(
			`**${token.name}**\n\nValue: \`${token.value}\`\n\nCategory: ${token.category}`
		);
		// Better sorting
		item.sortText = token.name;

		return item;
	});
}

function provideTokenHover(document: vscode.TextDocument, position: vscode.Position
): vscode.Hover | undefined {

	const range = document.getWordRangeAtPosition(position, /--[\w-]+/);
	if (!range) return;

	const tokenName = document.getText(range);
	const token = tokens.find(t => t.name === tokenName);

	if (!token) return;

	const md = new vscode.MarkdownString();

	md.appendCodeblock(token.name, "css");
	md.appendMarkdown(`**${token.value}** • ${token.category}`);

	return new vscode.Hover(md, range);
}

async function replaceOnSave(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
	const edits: vscode.TextEdit[] = [];

	for (let i = 0; i < document.lineCount; i++) {
		const line = document.lineAt(i);

		const match = line.text.match(/:\s*([^;]+);/);
		if (!match) continue;

		const value = match[1].trim();
		const token = tokens.find(t => t.value === value);

		if (!token) continue;

		const start = line.text.indexOf(value);

		edits.push(
			vscode.TextEdit.replace(
				new vscode.Range(i, start, i, start + value.length),
				`var(${token.name})`
			)
		);
	}

	return edits;
}

async function replaceWithToken(event: vscode.TextDocumentChangeEvent) {
	if (isUpdating) return;

	const editor = vscode.window.activeTextEditor;
	if (!editor || editor.document !== event.document) {
		return;
	}

	const change = event.contentChanges[0];
	if (!change) return;

	const text = change.text;
	// Only trigger after typing ';'
	if (!text.endsWith(";")) {
		return;
	}

	const line = editor.document.lineAt(change.range.start.line);
	const match = line.text.match(/:\s*([^;]+);/);

	if (!match) return;

	const value = match[1].trim();
	const token = tokens.find(t => t.value === value);

	if (!token) return;

	const valueStart = line.text.indexOf(value);
	const range = new vscode.Range(
		line.lineNumber,
		valueStart,
		line.lineNumber,
		valueStart + value.length
	);

	if (!(await shouldReplace(token))) return;

	isUpdating = true;

	await editor.edit(edit => {
		edit.replace(range, `var(${token.name})`);
	});

	isUpdating = false;
}

async function convertEntireFile(editor: vscode.TextEditor) {
	const document = editor.document;

	await editor.edit(editBuilder => {
		for (let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i);

			const match = line.text.match(/:\s*([^;]+);/);

			if (!match) {
				continue;
			}

			const value = match[1].trim();
			const token = tokens.find(t => t.value === value);

			if (!token) {
				continue;
			}

			const start = line.text.indexOf(value);

			editBuilder.replace(new vscode.Range(i, start, i, start + value.length),
				`var(${token.name})`
			);
		}
	});
}

async function loadTokens() {
	try {
		const pattern = getTokenFileName();
		const files = await vscode.workspace.findFiles(pattern);

		if (files.length === 0) {
			vscode.window.showWarningMessage("file not found");
			return;
		}

		const document = await vscode.workspace.openTextDocument(files[0]);
		const text = document.getText();
		const root = postcss.parse(text);

		tokens = [];

		root.walkRules(":root", (rule) => {
			// Ignore :root inside @media
			if (rule.parent?.type !== "root") return;

			rule.walkDecls((decl) => {
				if (!decl.prop.startsWith("--")) return;

				tokens.push({
					name: decl.prop,
					value: decl.value,
					category: getCategory(decl.prop)
				});
			});
		});

		vscode.window.showInformationMessage(`Loaded ${tokens.length} tokens`);

	} catch (error) {
		vscode.window.showErrorMessage(`Failed to load token.css\n${error}`);
	}
}

