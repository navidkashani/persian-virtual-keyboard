import { describe, it, expect } from 'vitest';
import { letterFactory } from '../letter.js';

const baseState = {
  textValue: '',
  selectionStart: 0,
  selectionEnd: 0,
};

describe('letterFactory', () => {
  it('inserts character at cursor', () => {
    const result = letterFactory(baseState, 'ش');
    expect(result.textValue).toBe('ش');
    expect(result.selectionEnd).toBe(1);
  });

  it('inserts at middle of text', () => {
    const state = { ...baseState, textValue: 'سم', selectionStart: 1, selectionEnd: 1 };
    const result = letterFactory(state, 'لا');
    expect(result.textValue).toBe('سلام');
    expect(result.selectionEnd).toBe(3);
  });

  it('replaces selection', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 0, selectionEnd: 4 };
    const result = letterFactory(state, 'خ');
    expect(result.textValue).toBe('خ');
    expect(result.selectionEnd).toBe(1);
    expect(result.selectedText).toBe('');
  });

  it('handles Latin character (CapsLock mode)', () => {
    const result = letterFactory(baseState, 'A');
    expect(result.textValue).toBe('A');
    expect(result.selectionEnd).toBe(1);
  });

  it('appends at end', () => {
    const state = { ...baseState, textValue: 'سلا', selectionStart: 3, selectionEnd: 3 };
    const result = letterFactory(state, 'م');
    expect(result.textValue).toBe('سلام');
  });
});
