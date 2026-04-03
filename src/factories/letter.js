import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert a Persian letter at cursor, replacing selection if any.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {string} char - The character to insert
 */
export function letterFactory(state, char) {
  return insertAtCursor(state, char);
}
