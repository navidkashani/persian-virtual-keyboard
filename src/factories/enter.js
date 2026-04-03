import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert a newline character at cursor.
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function enterFactory(state) {
  return insertAtCursor(state, '\n');
}
