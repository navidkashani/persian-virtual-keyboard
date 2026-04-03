import { safeCursorBack } from '../utils/cursor.js';

/**
 * Delete selection if any, returning updated state.
 * Shared by backspace and delete handlers.
 */
export function deleteSelection(state) {
  const { textValue, selectionStart, selectionEnd } = state;
  if (selectionStart === selectionEnd) return null;
  return {
    textValue: textValue.slice(0, selectionStart) + textValue.slice(selectionEnd),
    selectionStart,
    selectionEnd: selectionStart,
    selectedText: '',
  };
}

/**
 * Delete selection or character before cursor. Surrogate-pair safe.
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function backspaceFactory(state) {
  const selResult = deleteSelection(state);
  if (selResult) return selResult;

  const { textValue, selectionStart } = state;
  if (selectionStart === 0) return {};

  const deleteCount = safeCursorBack(textValue, selectionStart);
  const newCursor = selectionStart - deleteCount;
  return {
    textValue: textValue.slice(0, newCursor) + textValue.slice(selectionStart),
    selectionStart: newCursor,
    selectionEnd: newCursor,
    selectedText: '',
  };
}
