const PERSIAN_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const ARABIC_RE = /[\u0600-\u06FF]/;
const LATIN_RE = /[A-Za-z]/;

/**
 * Check if text contains Persian/Arabic script characters.
 * @param {string} text
 * @returns {boolean}
 */
export function isPersian(text) {
  return PERSIAN_RE.test(text);
}

/**
 * Check if text contains Arabic script characters.
 * @param {string} text
 * @returns {boolean}
 */
export function isArabic(text) {
  return ARABIC_RE.test(text);
}

/**
 * Check if text contains Latin characters.
 * @param {string} text
 * @returns {boolean}
 */
export function isLatin(text) {
  return LATIN_RE.test(text);
}
