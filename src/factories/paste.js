import { normalizePersian } from '../utils/normalize.js';
import { isLatin } from '../utils/detect.js';
import { insertAtCursor } from '../utils/cursor.js';
import { getKeyFromCode, CODE_TO_EN } from '../constants/layout.js';

// Derive EN→Code from Code→EN (single source of truth)
const EN_TO_CODE = Object.fromEntries(
  Object.entries(CODE_TO_EN).map(([code, en]) => [en, code]),
);

/**
 * Convert Latin text to Persian using ISIRI mapping.
 */
function convertLatinToPersian(text) {
  let result = '';
  for (const ch of text) {
    const lower = ch.toLowerCase();
    const code = EN_TO_CODE[lower];
    if (code) {
      const key = getKeyFromCode(code, false);
      if (key && key.fa && key.type !== 'modifier') {
        result += key.fa;
        continue;
      }
    }
    result += ch;
  }
  return result;
}

/**
 * Handle pasted text: normalize or convert, insert at cursor.
 * Entire paste = one undo step.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {string} pastedText - The pasted text (text/plain)
 */
export function pasteFactory(state, pastedText) {
  let processed;
  if (isLatin(pastedText) && !(/[\u0600-\u06FF]/).test(pastedText)) {
    processed = convertLatinToPersian(pastedText);
  } else {
    processed = normalizePersian(pastedText);
  }
  return insertAtCursor(state, processed);
}
