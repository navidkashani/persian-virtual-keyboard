import { describe, it, expect } from 'vitest';
import { numberFactory } from '../number.js';

const baseState = {
  textValue: '',
  selectionStart: 0,
  selectionEnd: 0,
};

describe('numberFactory', () => {
  it('inserts Persian numeral', () => {
    const result = numberFactory(baseState, '۱');
    expect(result.textValue).toBe('۱');
    expect(result.selectionEnd).toBe(1);
  });

  it('inserts at cursor position', () => {
    const state = { ...baseState, textValue: '۱۳', selectionStart: 1, selectionEnd: 1 };
    const result = numberFactory(state, '۲');
    expect(result.textValue).toBe('۱۲۳');
  });

  it('replaces selection with numeral', () => {
    const state = { ...baseState, textValue: '۱۲۳', selectionStart: 0, selectionEnd: 3 };
    const result = numberFactory(state, '۰');
    expect(result.textValue).toBe('۰');
  });
});
