import * as vscode from 'vscode';
import postcss from 'postcss'
import { Token, propertyMap } from './constant'

export function getCategory(name: string): string {
    const aliases: Record<string, string> = {
        // Colors
        "color": "color",

        // Spacing
        "space": "spacing",
        "spacing": "spacing",

        // Typography
        "fs": "font-size",
        "font-size": "font-size",

        "ff": "font-family",
        "font-family": "font-family",

        "fw": "font-weight",
        "font-weight": "font-weight",

        "lh": "line-height",
        "line-height": "line-height",

        "ls": "letter-spacing",
        "letter-spacing": "letter-spacing",

        // Radius
        "radius": "radius",

        // Shadow
        "shadow": "shadow",

        // Border
        "border": "border-width",
        "border-width": "border-width",

        // Duration
        "duration": "duration",

        // Opacity
        "opacity": "opacity",

        // Z Index
        "z": "z-index",
        "z-index": "z-index",

        // Cursor
        "cursor": "cursor",

        // Images
        "image": "image"
    };

    for (const prefix in aliases) {
        if (name.startsWith(`--${prefix}-`)) {
            return aliases[prefix];
        }
    }

    return "other";
}

export function getTokenFileName(): string {
    const config = vscode.workspace.getConfiguration("designTokenSetting");
    let tokenFile = config.get<string>("tokenFile")?.trim();
    return tokenFile ? `**/${tokenFile}` : "**/token.css";
}

export function getSettings() {
    const config = vscode.workspace.getConfiguration("designTokenSetting");

    return {
        allowReplaceOnSave: config.get<boolean>("replaceOnSave", false),
        allowReplaceOnType: config.get<boolean>("replaceOnType", false),
        confirmReplacement: config.get<boolean>("confirmReplacement", false),
    };
}

export async function shouldReplace(token: Token): Promise<boolean> {
    const { confirmReplacement } = getSettings();
    if (!confirmReplacement) return true;

    const answer = await vscode.window.showInformationMessage(
        `Replace with var(${token.name})?`,
        { modal: true },
        "Replace",
        "Cancel"
    );

    return answer === "Replace";
}
