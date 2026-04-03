import { describe, it, expect } from 'vitest';
import { isPersian, isArabic, isLatin } from '../detect.js';

describe('isPersian', () => {
  it('detects Persian text', () => {
    expect(isPersian('سلام')).toBe(true);
  });

  it('detects Arabic text as Persian (overlapping range)', () => {
    expect(isPersian('مرحبا')).toBe(true);
  });

  it('returns false for Latin text', () => {
    expect(isPersian('Hello')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isPersian('')).toBe(false);
  });

  it('detects mixed text', () => {
    expect(isPersian('سلام Hello')).toBe(true);
  });
});

describe('isArabic', () => {
  it('detects Arabic characters', () => {
    expect(isArabic('مرحبا')).toBe(true);
  });

  it('returns false for Latin', () => {
    expect(isArabic('Hello')).toBe(false);
  });
});

describe('isLatin', () => {
  it('detects Latin text', () => {
    expect(isLatin('Hello')).toBe(true);
  });

  it('returns false for Persian', () => {
    expect(isLatin('سلام')).toBe(false);
  });

  it('returns false for numbers only', () => {
    expect(isLatin('12345')).toBe(false);
  });
});
