# Smart Backspace

A VSCode extension that brings WebStorm-like smart backspace behavior to Visual Studio Code.

## What is Smart Backspace?

Smart Backspace enhances the default backspace behavior in VSCode:

- **When cursor is on a line containing only whitespace**: Deletes the empty line, moves the cursor to the end of the previous line, and automatically re-indents the code.
- **In all other cases**: Behaves like the standard backspace key.

This makes it much faster to clean up empty lines and maintain proper indentation while coding.

## Features

- 🎯 **Smart deletion** of empty lines with automatic indentation
- 🔧 **Configurable** language support
- ⚡ **Lightweight** and fast
- 🎨 Works seamlessly with VSCode's native editing experience

## Installation & Usage

### Running Locally (Development)

1. Clone or download this extension to your local machine
2. Open the `smart-backspace` folder in VSCode
3. Press `F5` to open a new Extension Development Host window
4. The extension will be active in the new window
5. Open any supported file (JavaScript, TypeScript, CSS, etc.)
6. Try pressing `Backspace` on an empty line at column 0

### Building and Installing

1. Install `vsce` if you haven't already:

   ```bash
   npm install -g vsce
   ```

2. Package the extension:

   ```bash
   vsce package
   ```

3. Install the `.vsix` file in VSCode:
   - Open VSCode
   - Go to Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
   - Click the `...` menu → "Install from VSIX..."
   - Select the generated `.vsix` file

## Configuration

By default, Smart Backspace is active for the following languages:

- JavaScript
- TypeScript
- JavaScript React (JSX)
- TypeScript React (TSX)
- CSS
- SCSS

### Customizing Language Support

You can configure which languages use Smart Backspace in your `settings.json`:

```json
{
  "smartBackspace.languages": ["javascript", "typescript", "javascriptreact", "typescriptreact", "css", "scss", "html", "json", "python"]
}
```

To open settings:

- **macOS**: `Cmd + ,`
- **Windows/Linux**: `Ctrl + ,`
- Then search for "Smart Backspace"

Or edit `settings.json` directly:

- **macOS**: `Cmd + Shift + P` → "Preferences: Open Settings (JSON)"
- **Windows/Linux**: `Ctrl + Shift + P` → "Preferences: Open Settings (JSON)"

## Usage Examples

### Example 1: Cleaning up empty lines

**Before** (cursor at `|` on a line with only whitespace):

```javascript
function example() {
  const x = 1
  |  // cursor anywhere on this whitespace-only line
  return x
}
```

**After** pressing `Backspace`:

```javascript
function example() {
  const x = 1|
  return x
}
```

The empty line is deleted, cursor moves to the end of the previous line, and the next line is automatically re-indented.

### Example 2: Normal backspace behavior

**Before** (cursor at `|`):

```javascript
const message = 'Hello|'
```

**After** pressing `Backspace`:

```javascript
const message = 'Hell|'
```

Standard backspace behavior when not on an empty line at column 0.

## Requirements

- VSCode version 1.60.0 or higher

## Development

### Project Structure

```
smart-backspace/
├── package.json      # Extension manifest
├── extension.js      # Main extension logic
├── README.md        # This file
└── .vscodeignore    # Files to exclude from build
```

### Key Concepts

The extension:

1. Registers a command `smartBackspace.deleteOrSmart`
2. Binds it to the `backspace` key (when editor is focused and not readonly)
3. Checks if the current language is in the configured list
4. Determines if cursor is on an empty line at column 0
5. Either performs smart deletion + re-indent, or falls back to normal backspace

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
