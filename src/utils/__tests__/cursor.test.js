import { describe, it, expect } from 'vitest';
import { safeCursorBack, insertAtCursor } from '../cursor.js';

describe('safeCursorBack', () => {
  it('returns 1 for normal characters', () => {
    expect(safeCursorBack('سلام', 4)).toBe(1);
  });

  it('returns 0 at position 0', () => {
    expect(safeCursorBack('سلام', 0)).toBe(0);
  });

  it('returns 2 for surrogate pairs', () => {
    const text = 'Hello😀';
    // 😀 is a surrogate pair: 5 chars + 2 code units = 7
    expect(safeCursorBack(text, 7)).toBe(2);
  });

  it('returns 1 for character before surrogate pair', () => {
    const text = 'Hello😀';
    expect(safeCursorBack(text, 5)).toBe(1);
  });

  it('handles empty string', () => {
    expect(safeCursorBack('', 0)).toBe(0);
  });
});

describe('insertAtCursor', () => {
  const baseState = { textValue: '', selectionStart: 0, selectionEnd: 0 };

  it('inserts into empty text', () => {
    const result = insertAtCursor(baseState, 'ش');
    expect(result.textValue).toBe('ش');
    expect(result.selectionEnd).toBe(1);
    expect(result.selectedText).toBe('');
  });

  it('inserts at middle of text', () => {
    const state = { textValue: 'سم', selectionStart: 1, selectionEnd: 1 };
    const result = insertAtCursor(state, 'لا');
    expect(result.textValue).toBe('سلام');
    expect(result.selectionStart).toBe(3);
    expect(result.selectionEnd).toBe(3);
  });

  it('replaces selection', () => {
    const state = { textValue: 'سلام', selectionStart: 0, selectionEnd: 4 };
    const result = insertAtCursor(state, 'خ');
    expect(result.textValue).toBe('خ');
    expect(result.selectionEnd).toBe(1);
  });

  it('handles multi-char insert', () => {
    const result = insertAtCursor(baseState, 'سلام');
    expect(result.textValue).toBe('سلام');
    expect(result.selectionEnd).toBe(4);
  });
});
