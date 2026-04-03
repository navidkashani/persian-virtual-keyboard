import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert a Persian numeral at cursor, replacing selection if any.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {string} char - The Persian numeral character
 */
export function numberFactory(state, char) {
  return insertAtCursor(state, char);
}
