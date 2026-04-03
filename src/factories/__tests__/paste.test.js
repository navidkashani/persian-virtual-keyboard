import { describe, it, expect } from 'vitest';
import { pasteFactory } from '../paste.js';
import { ZWNJ } from '../../constants/data.js';

const baseState = {
  textValue: '',
  selectionStart: 0,
  selectionEnd: 0,
};

describe('pasteFactory', () => {
  it('normalizes Arabic Yeh/Kaf on paste', () => {
    const result = pasteFactory(baseState, 'يك');
    expect(result.textValue).toBe('یک');
  });

  it('preserves ZWNJ in pasted text', () => {
    const text = 'می' + ZWNJ + 'خواهم';
    const result = pasteFactory(baseState, text);
    expect(result.textValue).toContain(ZWNJ);
  });

  it('handles multi-line text', () => {
    const result = pasteFactory(baseState, 'خط اول\nخط دوم');
    expect(result.textValue).toContain('\n');
  });

  it('inserts at cursor position', () => {
    const state = { ...baseState, textValue: 'سم', selectionStart: 1, selectionEnd: 1 };
    const result = pasteFactory(state, 'لا');
    expect(result.textValue).toBe('سلام');
  });

  it('converts Latin text to Persian', () => {
    const result = pasteFactory(baseState, 'sla');
    expect(result.textValue.length).toBe(3);
  });

  it('replaces selection', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 0, selectionEnd: 4 };
    const result = pasteFactory(state, 'خداحافظ');
    expect(result.textValue).toBe('خداحافظ');
  });
});
