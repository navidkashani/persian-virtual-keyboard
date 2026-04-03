import { describe, it, expect } from 'vitest';
import { spaceFactory } from '../space.js';
import { ZWNJ } from '../../constants/data.js';

const baseState = {
  textValue: '',
  selectionStart: 0,
  selectionEnd: 0,
};

describe('spaceFactory', () => {
  it('inserts space', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 4, selectionEnd: 4 };
    const result = spaceFactory(state, false);
    expect(result.textValue).toBe('سلام ');
    expect(result.selectionEnd).toBe(5);
  });

  it('inserts ZWNJ with Shift', () => {
    const state = { ...baseState, textValue: 'می', selectionStart: 2, selectionEnd: 2 };
    const result = spaceFactory(state, true);
    expect(result.textValue).toBe('می' + ZWNJ);
    expect(result.selectionEnd).toBe(3);
  });

  it('ZWNJ no-op at position 0', () => {
    const result = spaceFactory(baseState, true);
    expect(result).toEqual({});
  });

  it('ZWNJ no-op if previous char is ZWNJ', () => {
    const state = { ...baseState, textValue: 'می' + ZWNJ, selectionStart: 3, selectionEnd: 3 };
    const result = spaceFactory(state, true);
    expect(result).toEqual({});
  });

  it('replaces selection with space', () => {
    const state = { ...baseState, textValue: 'سلام', selectionStart: 1, selectionEnd: 3 };
    const result = spaceFactory(state, false);
    expect(result.textValue).toBe('س م');
  });
});
