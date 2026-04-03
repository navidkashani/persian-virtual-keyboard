// Row 1: Numbers row — ISIRI 9147 standard
// Normal: ` ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ ۰ - = Backspace
// Shifted: ~ ! @ # $ % ^ & * ( ) _ + Backspace

export const first_row = [
  { fa: '\u200D', en: '`', label: '`', title: 'Backtick', shifted: '~', type: 'punctuation', modifierClass: '' },
  { fa: '۱', en: '1', label: '۱', title: '1', shifted: '!', type: 'number', modifierClass: '' },
  { fa: '۲', en: '2', label: '۲', title: '2', shifted: '@', type: 'number', modifierClass: '' },
  { fa: '۳', en: '3', label: '۳', title: '3', shifted: '#', type: 'number', modifierClass: '' },
  { fa: '۴', en: '4', label: '۴', title: '4', shifted: '$', type: 'number', modifierClass: '' },
  { fa: '۵', en: '5', label: '۵', title: '5', shifted: '%', type: 'number', modifierClass: '' },
  { fa: '۶', en: '6', label: '۶', title: '6', shifted: '^', type: 'number', modifierClass: '' },
  { fa: '۷', en: '7', label: '۷', title: '7', shifted: '&', type: 'number', modifierClass: '' },
  { fa: '۸', en: '8', label: '۸', title: '8', shifted: '*', type: 'number', modifierClass: '' },
  { fa: '۹', en: '9', label: '۹', title: '9', shifted: '(', type: 'number', modifierClass: '' },
  { fa: '۰', en: '0', label: '۰', title: '0', shifted: ')', type: 'number', modifierClass: '' },
  { fa: '-', en: '-', label: '-', title: 'Minus', shifted: '_', type: 'punctuation', modifierClass: '' },
  { fa: '=', en: '=', label: '=', title: 'Equals', shifted: '+', type: 'punctuation', modifierClass: '' },
  { fa: 'Backspace', en: 'Backspace', label: '⌫', title: 'Backspace', type: 'modifier', modifierClass: 'wider' },
];

export const shifted_first_row = [
  { fa: '~', en: '`', label: '~', title: 'Tilde', type: 'punctuation', modifierClass: '' },
  { fa: '!', en: '1', label: '!', title: 'Exclamation mark', type: 'punctuation', modifierClass: '' },
  { fa: '@', en: '2', label: '@', title: 'At sign', type: 'punctuation', modifierClass: '' },
  { fa: '#', en: '3', label: '#', title: 'Hash', type: 'punctuation', modifierClass: '' },
  { fa: '$', en: '4', label: '$', title: 'Dollar', type: 'punctuation', modifierClass: '' },
  { fa: '٪', en: '5', label: '٪', title: 'Percent', type: 'punctuation', modifierClass: '' },
  { fa: '^', en: '6', label: '^', title: 'Caret', type: 'punctuation', modifierClass: '' },
  { fa: '&', en: '7', label: '&', title: 'Ampersand', type: 'punctuation', modifierClass: '' },
  { fa: '*', en: '8', label: '*', title: 'Asterisk', type: 'punctuation', modifierClass: '' },
  { fa: '(', en: '9', label: '(', title: 'Left parenthesis', type: 'punctuation', modifierClass: '' },
  { fa: ')', en: '0', label: ')', title: 'Right parenthesis', type: 'punctuation', modifierClass: '' },
  { fa: '_', en: '-', label: '_', title: 'Underscore', type: 'punctuation', modifierClass: '' },
  { fa: '+', en: '=', label: '+', title: 'Plus', type: 'punctuation', modifierClass: '' },
  { fa: 'Backspace', en: 'Backspace', label: '⌫', title: 'Backspace', type: 'modifier', modifierClass: 'wider' },
];
