import { insertAtCursor } from '../utils/cursor.js';

/**
 * Insert a tab character at cursor.
 * Only called by virtual Tab button (physical Tab does normal focus navigation).
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function tabFactory(state) {
  return insertAtCursor(state, '\t');
}
