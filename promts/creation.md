You are an expert VSCode extension developer.  
Create a new VSCode extension project called **smart-backspace**.

## Requirements

1. The extension overrides the default `Backspace` behavior:
   - If the cursor is on an **empty line** at column 0 → delete that line, move the cursor to the end of the previous line, then trigger **auto-indent** (like WebStorm smart backspace).
   - In all other cases → behave like normal `Backspace`.

2. Language scope:
   - The feature should only apply to certain languages.
   - By default: `javascript`, `typescript`, `javascriptreact`, `typescriptreact`, `css`, `scss`.
   - Make the list configurable via `settings.json` contribution (`smartBackspace.languages`).

3. Code quality:
   - Follow **best practices** for VSCode extension development.
   - The code must be clean, readable, extensible, and maintainable.
   - Do not use OOP directly (no classes as the main design), but leverage OOP features (encapsulation, modularity, separation of concerns) through functions and modules.
   - Organize the code in a way that future contributors can easily add more logic (e.g., new language checks or more smart behaviors).

4. Project structure:

smart-backspace/
├─ package.json
├─ extension.js
├─ README.md
├─ .vscodeignore

5. `package.json`:

- Define extension metadata (name, description, version, engines).
- Register the command `smartBackspace.deleteOrSmart`.
- Bind it to the `backspace` key when `editorTextFocus && !editorReadonly`.
- Contribution must allow `smartBackspace.languages` setting (defaulting to the languages listed above).
- Activation event: `"onCommand:smartBackspace.deleteOrSmart"`.

6. `extension.js`:

- Implement the command using VSCode API (`editor.edit`, `deleteLeft`, `editor.action.reindentselectedlines`).
- If line is empty and cursor is at char 0:
  - delete the line, move cursor up, run re-indent.
- Otherwise → run `deleteLeft`.
- Add logic that checks the active file’s language, and only run Smart Backspace if it is in the configured language list.

7. `README.md`:

- Explain what Smart Backspace does.
- Installation guide (how to run/debug extension locally with `F5`).
- Explain how to configure `smartBackspace.languages` in `settings.json`.
- Usage examples.

8. `.vscodeignore`:

- Ignore `node_modules`, `.git`, and other unnecessary files.

9. Project should be ready to build/run:

- Include `npm init -y` and dependency `"vscode"` in devDependencies.
- Code must be complete and runnable as-is.
