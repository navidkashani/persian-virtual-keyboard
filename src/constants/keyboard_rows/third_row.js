// Row 3: Middle letter row — ISIRI 9147 standard
// Normal: CapsLock ش س ی ب ل ا ت ن م ک گ Enter
// Shifted: CapsLock َ ُ ِ إ أ آ ة » ؤ : ؛ Enter

export const third_row = [
  { fa: 'CapsLock', en: 'CapsLock', label: 'CapsLock', title: 'CapsLock — Toggle Latin/Persian', type: 'modifier', modifierClass: 'wider' },
  { fa: 'ش', en: 'a', label: 'ش', title: 'Shin', shifted: 'َ', type: 'letter', modifierClass: '' },
  { fa: 'س', en: 's', label: 'س', title: 'Sin', shifted: 'ُ', type: 'letter', modifierClass: '' },
  { fa: 'ی', en: 'd', label: 'ی', title: 'Ye', shifted: 'ِ', type: 'letter', modifierClass: '' },
  { fa: 'ب', en: 'f', label: 'ب', title: 'Be', shifted: 'إ', type: 'letter', modifierClass: '' },
  { fa: 'ل', en: 'g', label: 'ل', title: 'Lam', shifted: 'أ', type: 'letter', modifierClass: '' },
  { fa: 'ا', en: 'h', label: 'ا', title: 'Alef', shifted: 'آ', type: 'letter', modifierClass: '' },
  { fa: 'ت', en: 'j', label: 'ت', title: 'Te', shifted: 'ة', type: 'letter', modifierClass: '' },
  { fa: 'ن', en: 'k', label: 'ن', title: 'Nun', shifted: '«', type: 'letter', modifierClass: '' },
  { fa: 'م', en: 'l', label: 'م', title: 'Mim', shifted: 'ؤ', type: 'letter', modifierClass: '' },
  { fa: 'ک', en: ';', label: 'ک', title: 'Kaf', shifted: ':', type: 'letter', modifierClass: '' },
  { fa: 'گ', en: "'", label: 'گ', title: 'Gaf', shifted: '؛', type: 'letter', modifierClass: '' },
  { fa: 'Enter', en: 'Enter', label: 'Enter', title: 'Enter', type: 'modifier', modifierClass: 'wider' },
];

export const shifted_third_row = [
  { fa: 'CapsLock', en: 'CapsLock', label: 'CapsLock', title: 'CapsLock — Toggle Latin/Persian', type: 'modifier', modifierClass: 'wider' },
  { fa: 'َ', en: 'a', label: 'َ', title: 'Fatha', type: 'punctuation', modifierClass: '' },
  { fa: 'ُ', en: 's', label: 'ُ', title: 'Damma', type: 'punctuation', modifierClass: '' },
  { fa: 'ِ', en: 'd', label: 'ِ', title: 'Kasra', type: 'punctuation', modifierClass: '' },
  { fa: 'إ', en: 'f', label: 'إ', title: 'Alef with Hamza below', type: 'letter', modifierClass: '' },
  { fa: 'أ', en: 'g', label: 'أ', title: 'Alef with Hamza above', type: 'letter', modifierClass: '' },
  { fa: 'آ', en: 'h', label: 'آ', title: 'Alef with Madda', type: 'letter', modifierClass: '' },
  { fa: 'ة', en: 'j', label: 'ة', title: 'Teh Marbuta', type: 'letter', modifierClass: '' },
  { fa: '«', en: 'k', label: '«', title: 'Left guillemet', type: 'punctuation', modifierClass: '' },
  { fa: 'ؤ', en: 'l', label: 'ؤ', title: 'Waw with Hamza', type: 'letter', modifierClass: '' },
  { fa: ':', en: ';', label: ':', title: 'Colon', type: 'punctuation', modifierClass: '' },
  { fa: '؛', en: "'", label: '؛', title: 'Arabic semicolon', type: 'punctuation', modifierClass: '' },
  { fa: 'Enter', en: 'Enter', label: 'Enter', title: 'Enter', type: 'modifier', modifierClass: 'wider' },
];
