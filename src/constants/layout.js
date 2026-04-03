import { first_row, shifted_first_row } from './keyboard_rows/first_row.js';
import { second_row, shifted_second_row } from './keyboard_rows/second_row.js';
import { third_row, shifted_third_row } from './keyboard_rows/third_row.js';
import { fourth_row, shifted_fourth_row } from './keyboard_rows/fourth_row.js';
import { fifth_row, shifted_fifth_row } from './keyboard_rows/fifth_row.js';
import { mobile_first_row, shifted_mobile_first_row } from './mobile_keyboard_rows/mobile_first_row.js';
import { mobile_second_row, shifted_mobile_second_row } from './mobile_keyboard_rows/mobile_second_row.js';
import { mobile_third_row, shifted_mobile_third_row } from './mobile_keyboard_rows/mobile_third_row.js';
import { mobile_fourth_row, shifted_mobile_fourth_row } from './mobile_keyboard_rows/mobile_fourth_row.js';

// Desktop button groups
export const desktop_button_groups = [
  { name: 'first_row', buttons: first_row },
  { name: 'second_row', buttons: second_row },
  { name: 'third_row', buttons: third_row },
  { name: 'fourth_row', buttons: fourth_row },
  { name: 'fifth_row', buttons: fifth_row },
];

export const shifted_desktop_button_groups = [
  { name: 'first_row', buttons: shifted_first_row },
  { name: 'second_row', buttons: shifted_second_row },
  { name: 'third_row', buttons: shifted_third_row },
  { name: 'fourth_row', buttons: shifted_fourth_row },
  { name: 'fifth_row', buttons: shifted_fifth_row },
];

// Mobile button groups
export const mobile_button_groups = [
  { name: 'first_row_mobile', buttons: mobile_first_row },
  { name: 'second_row_mobile', buttons: mobile_second_row },
  { name: 'third_row_mobile', buttons: mobile_third_row },
  { name: 'fourth_row_mobile', buttons: mobile_fourth_row },
];

export const shifted_mobile_button_groups = [
  { name: 'first_row_mobile', buttons: shifted_mobile_first_row },
  { name: 'second_row_mobile', buttons: shifted_mobile_second_row },
  { name: 'third_row_mobile', buttons: shifted_mobile_third_row },
  { name: 'fourth_row_mobile', buttons: shifted_mobile_fourth_row },
];

// Map physical event.code → key data for physical keyboard interception
// Based on ISIRI 9147 mapping (QWERTY position → Persian character)
const allRows = [first_row, second_row, third_row, fourth_row];
const allShiftedRows = [shifted_first_row, shifted_second_row, shifted_third_row, shifted_fourth_row];

// event.code to English key mapping (exported for paste.js to derive inverse)
export const CODE_TO_EN = {
  Backquote: '`', Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4',
  Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
  Minus: '-', Equal: '=',
  KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
  KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
  BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
  KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
  Semicolon: ';', Quote: "'",
  KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b',
  KeyN: 'n', KeyM: 'm', Comma: ',', Period: '.', Slash: '/',
  Space: 'Space',
};

// Build lookup: en → key data (normal and shifted)
const enToKey = new Map();
const enToShiftedKey = new Map();

for (const row of allRows) {
  for (const key of row) {
    if (key.type !== 'modifier') {
      enToKey.set(key.en, key);
    }
  }
}
for (const row of allShiftedRows) {
  for (const key of row) {
    if (key.type !== 'modifier') {
      enToShiftedKey.set(key.en, key);
    }
  }
}

/**
 * Map event.code to Persian key data.
 * @param {string} code - KeyboardEvent.code
 * @param {boolean} shifted - Whether Shift is held
 * @returns {{ fa: string, type: string } | null}
 */
export function getKeyFromCode(code, shifted) {
  const en = CODE_TO_EN[code];
  if (!en) return null;
  if (en === 'Space') return { fa: ' ', type: 'modifier', en: 'Space' };
  const map = shifted ? enToShiftedKey : enToKey;
  return map.get(en) || null;
}

/**
 * Map event.code to the English key for highlighting virtual keys.
 * @param {string} code - KeyboardEvent.code
 * @returns {string|null}
 */
export function getEnFromCode(code) {
  return CODE_TO_EN[code] || null;
}

// Collect all letter keys for Latin mode (CapsLock)
const LATIN_MAP = {};
for (const [code, en] of Object.entries(CODE_TO_EN)) {
  if (code.startsWith('Key')) {
    LATIN_MAP[code] = { lower: en, upper: en.toUpperCase() };
  }
}

/**
 * Get Latin character for CapsLock mode.
 * @param {string} code - KeyboardEvent.code
 * @param {boolean} shifted - Whether Shift is held
 * @returns {string|null}
 */
export function getLatinFromCode(code, shifted) {
  const entry = LATIN_MAP[code];
  if (!entry) return null;
  return shifted ? entry.lower : entry.upper; // CapsLock inverts shift behavior
}
