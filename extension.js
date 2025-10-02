const vscode = require('vscode')

/**
 * Supported languages
 */
const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact', 'css', 'scss']

/**
 * Retrieves the configured list of language IDs where Smart Backspace is active.
 * @returns {string[]} Array of language IDs
 */
const getConfiguredLanguages = () => {
  const config = vscode.workspace.getConfiguration('smartBackspace')
  return config.get('languages', SUPPORTED_LANGUAGES)
}

/**
 * Checks if the current editor's language is in the configured list.
 * @param {vscode.TextEditor} editor - The active text editor
 * @returns {boolean} True if language is supported
 */
const isLanguageSupported = editor => {
  const languageId = editor.document.languageId
  const configuredLanguages = getConfiguredLanguages()
  return configuredLanguages.includes(languageId)
}

/**
 * Checks if the cursor is on a line containing only whitespace.
 * @param {vscode.TextEditor} editor - The active text editor
 * @param {vscode.Position} position - Current cursor position
 * @returns {boolean} True if line contains only whitespace
 */
const isOnEmptyLineAtStart = (editor, position) => {
  const line = editor.document.lineAt(position.line)
  return line.text.trim().length === 0
}

/**
 * Performs smart backspace: deletes the empty line, moves cursor up, and re-indents.
 * @param {vscode.TextEditor} editor - The active text editor
 */
const performSmartBackspace = async editor => {
  const position = editor.selection.active
  const currentLine = position.line

  if (currentLine === 0) {
    // If on first line, just do normal backspace
    await vscode.commands.executeCommand('deleteLeft')
    return
  }

  const targetLineNumber = currentLine - 1

  await editor.edit(editBuilder => {
    // Delete the current empty line
    const rangeToDelete = new vscode.Range(currentLine, 0, currentLine + 1, 0)
    editBuilder.delete(rangeToDelete)
  })

  // Get the target line AFTER deletion
  const targetLine = editor.document.lineAt(targetLineNumber)
  const endOfTargetLine = targetLine.range.end

  // Move cursor to end of target line
  editor.selection = new vscode.Selection(endOfTargetLine, endOfTargetLine)

  // Only trigger auto-indent if target line has actual content
  // If it's also empty/whitespace, skip re-indent to preserve cursor position
  if (targetLine.text.trim().length > 0) {
    await vscode.commands.executeCommand('editor.action.reindentselectedlines')
  }
}

/**
 * Performs normal backspace operation.
 */
const performNormalBackspace = async () => {
  await vscode.commands.executeCommand('deleteLeft')
}

/**
 * Main command handler for Smart Backspace.
 */
const handleSmartBackspace = async () => {
  const editor = vscode.window.activeTextEditor

  if (!editor) {
    return
  }

  // Check if language is supported
  if (!isLanguageSupported(editor)) {
    await performNormalBackspace()
    return
  }

  const position = editor.selection.active

  // Check if cursor is on a line with only whitespace
  if (isOnEmptyLineAtStart(editor, position)) {
    await performSmartBackspace(editor)
  } else {
    await performNormalBackspace()
  }
}

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context
 */
const activate = context => {
  const disposable = vscode.commands.registerCommand('smartBackspace.deleteOrSmart', handleSmartBackspace)

  context.subscriptions.push(disposable)
}

/**
 * Deactivates the extension.
 */
const deactivate = () => {}

module.exports = {
  activate,
  deactivate,
}
