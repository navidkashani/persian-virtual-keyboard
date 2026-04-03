import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert a punctuation character at cursor.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {string} char - The punctuation character to insert
 */
export function punctuationFactory(state, char) {
  return insertAtCursor(state, char);
}
