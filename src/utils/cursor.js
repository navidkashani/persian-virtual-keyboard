/**
 * Returns how many UTF-16 code units to delete backwards.
 * 2 for surrogate pairs, 1 otherwise.
 * @param {string} text
 * @param {number} position - Cursor position (in UTF-16 code units)
 * @returns {number} 0, 1, or 2
 */
export function safeCursorBack(text, position) {
  if (position <= 0) return 0;
  const code = text.charCodeAt(position - 1);
  // Low surrogate (0xDC00–0xDFFF) means we're in a surrogate pair
  if (code >= 0xDC00 && code <= 0xDFFF && position >= 2) {
    return 2;
  }
  return 1;
}

/**
 * Insert text at cursor position, replacing any selection.
 * Shared by letter, number, punctuation, tab, enter, space, paste factories.
 * @param {{ textValue: string, selectionStart: number, selectionEnd: number }} state
 * @param {string} text - The text to insert
 * @returns {{ textValue: string, selectionStart: number, selectionEnd: number, selectedText: string }}
 */
export function insertAtCursor(state, text) {
  const { textValue, selectionStart, selectionEnd } = state;
  const before = textValue.slice(0, selectionStart);
  const after = textValue.slice(selectionEnd);
  const newCursor = selectionStart + text.length;
  return {
    textValue: before + text + after,
    selectionStart: newCursor,
    selectionEnd: newCursor,
    selectedText: '',
  };
}
