import { ZWNJ } from '../constants/data.js';
import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert space, or ZWNJ if shift is held.
 * ZWNJ guard: no-op if cursor at 0 or previous char is already ZWNJ.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {boolean} shiftHeld
 */
export function spaceFactory(state, shiftHeld) {
  if (shiftHeld) {
    if (state.selectionStart === 0) return {};
    if (state.textValue[state.selectionStart - 1] === ZWNJ) return {};
    return insertAtCursor(state, ZWNJ);
  }
  return insertAtCursor(state, ' ');
}
