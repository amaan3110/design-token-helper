# Design Token Helper

A Visual Studio Code extension that makes working with CSS Design Tokens effortless.

Design Token Helper automatically loads your design tokens from a CSS file and provides:

- 🎨 Smart autocomplete for CSS variables
- 💡 Hover preview of token values
- 🔄 Convert existing CSS values into design tokens
- ⚡ Automatic replacement while typing or saving
- 📂 Configurable token file
- 👀 Live token reloading when your token file changes

---

## Features

### Smart Autocomplete

Shows only the design tokens relevant to the current CSS property.

Example:

```css
.button {
  color: |;
}
```

Suggestions:

```css
var(--color-primary)
var(--color-secondary)
var(--color-danger)
```

For

```css
padding:;
```

only spacing tokens are suggested.

---

### Hover Information

Hover over a token to view its details.

```css
var(--color-primary)
```

Displays

```
--color-primary

#2563eb

Category: Color
```

---

### Convert Existing CSS

Convert hardcoded values into design tokens.

Before

```css
.card {
  padding: 16px;
  border-radius: 8px;
  color: #2563eb;
}
```

After

```css
.card {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  color: var(--color-primary);
}
```

---

### Replace While Typing

When enabled,

Typing

```css
color: #2563eb;
```

automatically becomes

```css
color: var(--color-primary);
```

---

### Replace On Save

Automatically converts matching CSS values whenever you save the file.

---

### Live Token Reload

Whenever your token file changes, the extension reloads all design tokens automatically.

No restart required.

---

## Supported Languages

- CSS
- SCSS
- LESS

---

## Token File

The extension reads design tokens from a CSS file containing a top-level `:root`.

Example

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-danger: #ef4444;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* Typography */
  --font-size-base: 16px;
}
```

Nested `:root` blocks inside media queries are ignored.

---

## Supported Token Categories

The extension automatically categorizes tokens by their prefixes.

| Prefix              | Category       |
| ------------------- | -------------- |
| --color-\*          | Colors         |
| --space-\*          | Spacing        |
| --font-size-\*      | Font Size      |
| --font-family-\*    | Font Family    |
| --font-weight-\*    | Font Weight    |
| --line-height-\*    | Line Height    |
| --letter-spacing-\* | Letter Spacing |
| --radius-\*         | Border Radius  |
| --shadow-\*         | Shadows        |
| --border-\*         | Border Width   |
| --duration-\*       | Duration       |
| --opacity-\*        | Opacity        |
| --z-\*              | Z Index        |
| --cursor-\*         | Cursor         |
| --image-\*          | Images         |

---

## Commands

Open the Command Palette (`Ctrl + Shift + P`)

#### Design Token Setting: Select Token File

Configure the design token CSS file.

Example

```
token.css
```

or

```
tokens.scss
```

#### Design Token Helper: Restart Extension

Reload the VS Code window to restart the extension and refresh its state.

---

### Convert Current File to Design Tokens

Converts all matching hardcoded CSS values in the current file into design tokens.

---

## Extension Settings

This extension contributes the following settings.

### Token File

```json
{
  "designTokenSetting.tokenFile": "token.css"
}
```

Default

```
token.css
```

---

### Replace On Save

Automatically replace matching CSS values on save.

```json
{
  "designTokenSetting.replaceOnSave": true
}
```

---

### Replace While Typing

Automatically replace values immediately after typing `;`

```json
{
  "designTokenSetting.replaceOnType": false
}
```

---

### Confirm Before Replacement

Ask for confirmation before replacing a value.

```json
{
  "designTokenSetting.confirmReplacement": false
}
```

---

## Installation

1. Install **Design Token Helper** from the VS Code Marketplace.
2. Open your project.
3. Ensure your design tokens are defined inside a CSS `:root` block.
4. Configure the token file if necessary.
5. Start writing CSS.

---

## 📋 Release History

| Version | Release Date | Download                                                                                                  | Status    |
| ------- | ------------ | --------------------------------------------------------------------------------------------------------- | --------- |
| v0.0.3  | 21 July 2026 | [Download VSIX](https://github.com/amaan3110/design-token-helper/releases/design-token-helper-0.0.3.vsix) | ✅ Latest |
| v0.0.2  | 21 July 2026 | [Download VSIX](https://github.com/amaan3110/design-token-helper/releases/design-token-helper-0.0.2.vsix) | ✅ Latest |
| v0.0.1  | 18 July 2026 | [Download VSIX](https://github.com/amaan3110/design-token-helper/releases/design-token-helper-0.0.1.vsix) | Archived  |

---

## Requirements

- Visual Studio Code 1.125.0 or later

---

## Roadmap

Planned features include

- Support for JSON design tokens
- Support for Style Dictionary
- Tailwind CSS token suggestions
- Figma Tokens compatibility
- Custom token categories
- Workspace-wide conversion
- Quick Fix actions
- Token preview colors inside completion list

---

## Contributing

Issues and feature requests are welcome.

If you have ideas to improve the extension, feel free to open an issue or submit a pull request.

---

## License

MIT
