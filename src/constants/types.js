/**
 * @typedef {Object} KeyButton
 * @property {string} fa - Persian character to insert
 * @property {string} en - QWERTY key that maps to this position
 * @property {string} label - Display label on the key
 * @property {string} title - Accessibility tooltip
 * @property {string} [shifted] - Shifted character
 * @property {'letter'|'number'|'punctuation'|'modifier'} type
 * @property {string} [modifierClass] - Optional CSS classes
 */

/**
 * @typedef {Object} ButtonGroup
 * @property {string} name - CSS class name for the row
 * @property {KeyButton[]} buttons - Array of key buttons in this row
 */

/**
 * @typedef {Object} KeyboardState
 * @property {string} textValue - Current text in textarea
 * @property {number} selectionStart - Selection start position
 * @property {number} selectionEnd - Selection end position
 * @property {boolean} capsLock - CapsLock state (Latin mode toggle)
 * @property {boolean} shift - Shift key state
 * @property {Array<{text: string, cursor: number}>} history - Undo/redo stack
 * @property {number} historyIndex - Position in undo/redo stack
 * @property {number} lastInputTime - Timestamp of last character input
 * @property {boolean} groupOpen - Whether current undo group is open
 */

export {};
