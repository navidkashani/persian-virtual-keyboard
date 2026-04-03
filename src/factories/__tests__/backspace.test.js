import { describe, it, expect } from 'vitest';
import { backspaceFactory } from '../backspace.js';

const baseState = {
  textValue: '',
  selectionStart: 0,
  selectionEnd: 0,
};

describe('backspaceFactory', () => {
  it('deletes character before cursor', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 4, selectionEnd: 4 };
    const result = backspaceFactory(state);
    expect(result.textValue).toBe('سلا');
    expect(result.selectionEnd).toBe(3);
  });

  it('deletes selection', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 1, selectionEnd: 3 };
    const result = backspaceFactory(state);
    expect(result.textValue).toBe('سم');
    expect(result.selectionStart).toBe(1);
  });

  it('no-op at position 0', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 0, selectionEnd: 0 };
    const result = backspaceFactory(state);
    expect(result).toEqual({});
  });

  it('handles surrogate pair deletion', () => {
    const state = { ...baseState, textValue: 'سلام😀', selectionStart: 6, selectionEnd: 6 };
    const result = backspaceFactory(state);
    expect(result.textValue).toBe('سلام');
    expect(result.selectionEnd).toBe(4);
  });

  it('deletes single character before surrogate pair', () => {
    const state = { ...baseState, textValue: 'ا😀', selectionStart: 1, selectionEnd: 1 };
    const result = backspaceFactory(state);
    expect(result.textValue).toBe('😀');
    expect(result.selectionEnd).toBe(0);
  });
});
