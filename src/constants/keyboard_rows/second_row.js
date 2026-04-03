// Row 2: Top letter row — ISIRI 9147 standard
// Normal: Tab ض ص ث ق ف غ ع ه خ ح ج چ \ (backslash)
// Shifted: Tab ً ٌ ٍ ﷼ ٪ × ، » ] [ } { |

export const second_row = [
  { fa: 'Tab', en: 'Tab', label: 'Tab', title: 'Tab', type: 'modifier', modifierClass: 'wider' },
  { fa: 'ض', en: 'q', label: 'ض', title: 'Zad', shifted: 'ً', type: 'letter', modifierClass: '' },
  { fa: 'ص', en: 'w', label: 'ص', title: 'Sad', shifted: 'ٌ', type: 'letter', modifierClass: '' },
  { fa: 'ث', en: 'e', label: 'ث', title: 'Se', shifted: 'ٍ', type: 'letter', modifierClass: '' },
  { fa: 'ق', en: 'r', label: 'ق', title: 'Qaf', shifted: '﷼', type: 'letter', modifierClass: '' },
  { fa: 'ف', en: 't', label: 'ف', title: 'Fe', shifted: '٪', type: 'letter', modifierClass: '' },
  { fa: 'غ', en: 'y', label: 'غ', title: 'Gheyn', shifted: '×', type: 'letter', modifierClass: '' },
  { fa: 'ع', en: 'u', label: 'ع', title: 'Eyn', shifted: '،', type: 'letter', modifierClass: '' },
  { fa: 'ه', en: 'i', label: 'ه', title: 'He', shifted: '»', type: 'letter', modifierClass: '' },
  { fa: 'خ', en: 'o', label: 'خ', title: 'Khe', shifted: ']', type: 'letter', modifierClass: '' },
  { fa: 'ح', en: 'p', label: 'ح', title: 'He (jimi)', shifted: '[', type: 'letter', modifierClass: '' },
  { fa: 'ج', en: '[', label: 'ج', title: 'Jim', shifted: '}', type: 'letter', modifierClass: '' },
  { fa: 'چ', en: ']', label: 'چ', title: 'Che', shifted: '{', type: 'letter', modifierClass: '' },
  { fa: '\\', en: '\\', label: '\\', title: 'Backslash', shifted: '|', type: 'punctuation', modifierClass: '' },
];

export const shifted_second_row = [
  { fa: 'Tab', en: 'Tab', label: 'Tab', title: 'Tab', type: 'modifier', modifierClass: 'wider' },
  { fa: 'ً', en: 'q', label: 'ً', title: 'Fathatan', type: 'punctuation', modifierClass: '' },
  { fa: 'ٌ', en: 'w', label: 'ٌ', title: 'Dammatan', type: 'punctuation', modifierClass: '' },
  { fa: 'ٍ', en: 'e', label: 'ٍ', title: 'Kasratan', type: 'punctuation', modifierClass: '' },
  { fa: '﷼', en: 'r', label: '﷼', title: 'Rial sign', type: 'punctuation', modifierClass: '' },
  { fa: '٪', en: 't', label: '٪', title: 'Arabic percent', type: 'punctuation', modifierClass: '' },
  { fa: '×', en: 'y', label: '×', title: 'Multiplication sign', type: 'punctuation', modifierClass: '' },
  { fa: '،', en: 'u', label: '،', title: 'Arabic comma', type: 'punctuation', modifierClass: '' },
  { fa: '»', en: 'i', label: '»', title: 'Right guillemet', type: 'punctuation', modifierClass: '' },
  { fa: ']', en: 'o', label: ']', title: 'Right bracket', type: 'punctuation', modifierClass: '' },
  { fa: '[', en: 'p', label: '[', title: 'Left bracket', type: 'punctuation', modifierClass: '' },
  { fa: '}', en: '[', label: '}', title: 'Right brace', type: 'punctuation', modifierClass: '' },
  { fa: '{', en: ']', label: '{', title: 'Left brace', type: 'punctuation', modifierClass: '' },
  { fa: '|', en: '\\', label: '|', title: 'Pipe', type: 'punctuation', modifierClass: '' },
];
