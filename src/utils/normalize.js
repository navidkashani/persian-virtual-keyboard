import { NORMALIZATION_MAP } from '../constants/data.js';

/**
 * Normalize Arabic-form characters to Persian equivalents.
 * Converts Arabic Yeh (U+064A) → Persian Yeh (U+06CC)
 * and Arabic Kaf (U+0643) → Persian Keheh (U+06A9).
 * @param {string} text
 * @returns {string}
 */
export function normalizePersian(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    result += NORMALIZATION_MAP[ch] || ch;
  }
  return result;
}
