import { describe, it, expect } from 'vitest';
import { normalizePersian } from '../normalize.js';

describe('normalizePersian', () => {
  it('converts Arabic Yeh to Persian Yeh', () => {
    expect(normalizePersian('ي')).toBe('ی'); // U+064A → U+06CC
  });

  it('converts Arabic Kaf to Persian Keheh', () => {
    expect(normalizePersian('ك')).toBe('ک'); // U+0643 → U+06A9
  });

  it('converts mixed text', () => {
    expect(normalizePersian('يك')).toBe('یک');
  });

  it('preserves Persian characters unchanged', () => {
    expect(normalizePersian('سلام')).toBe('سلام');
  });

  it('preserves ZWNJ', () => {
    expect(normalizePersian('می\u200Cخواهم')).toBe('می\u200Cخواهم');
  });

  it('handles empty string', () => {
    expect(normalizePersian('')).toBe('');
  });

  it('preserves Latin characters', () => {
    expect(normalizePersian('Hello')).toBe('Hello');
  });

  it('handles mixed Arabic and Persian text', () => {
    expect(normalizePersian('كتاب يك')).toBe('کتاب یک');
  });
});
