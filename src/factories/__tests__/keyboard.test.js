import { describe, it, expect } from 'vitest';
import { keyboardFactory } from '../keyboard.js';

function makeState(overrides = {}) {
  return {
    textValue: '',
    selectionStart: 0,
    selectionEnd: 0,
    capsLock: false,
    shift: false,
    history: [{ text: '', cursor: 0 }],
    historyIndex: 0,
    lastInputTime: 0,
    groupOpen: false,
    ...overrides,
  };
}

function makeEvent(overrides = {}) {
  return {
    code: 'KeyA',
    key: 'a',
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    isComposing: false,
    repeat: false,
    ...overrides,
  };
}

describe('keyboardFactory', () => {
  it('maps KeyA to ش (Shin)', () => {
    const result = keyboardFactory(makeEvent({ code: 'KeyA' }), makeState());
    expect(result).not.toBeNull();
    expect(result.char).toBe('ش');
  });

  it('maps KeyH to ا (Alef)', () => {
    const result = keyboardFactory(makeEvent({ code: 'KeyH' }), makeState());
    expect(result.char).toBe('ا');
  });

  it('maps Shift+KeyH to آ (Alef with Madda)', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'KeyH', shiftKey: true }),
      makeState(),
    );
    expect(result.char).toBe('آ');
  });

  it('returns null for Alt key events', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'KeyA', altKey: true }),
      makeState(),
    );
    expect(result).toBeNull();
  });

  it('returns null during IME composition', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'KeyA', isComposing: true }),
      makeState(),
    );
    expect(result).toBeNull();
  });

  it('returns null for Tab (browser focus navigation)', () => {
    const result = keyboardFactory(makeEvent({ code: 'Tab' }), makeState());
    expect(result).toBeNull();
  });

  it('returns null for arrow keys', () => {
    const result = keyboardFactory(makeEvent({ code: 'ArrowLeft' }), makeState());
    expect(result).toBeNull();
  });

  it('handles Ctrl+Z for undo', () => {
    const state = makeState({
      history: [{ text: '', cursor: 0 }, { text: 'سلام', cursor: 4 }],
      historyIndex: 1,
      textValue: 'سلام',
    });
    const result = keyboardFactory(makeEvent({ code: 'KeyZ', ctrlKey: true }), state);
    expect(result).not.toBeNull();
    expect(result.stateUpdate.textValue).toBe('');
  });

  it('handles Ctrl+Shift+Z for redo', () => {
    const state = makeState({
      history: [{ text: '', cursor: 0 }, { text: 'سلام', cursor: 4 }],
      historyIndex: 0,
    });
    const result = keyboardFactory(
      makeEvent({ code: 'KeyZ', ctrlKey: true, shiftKey: true }),
      state,
    );
    expect(result.stateUpdate.textValue).toBe('سلام');
  });

  it('types Latin character in CapsLock mode', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'KeyA' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('A');
  });

  it('handles Space', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Space' }),
      makeState({ textValue: 'سلام', selectionStart: 4, selectionEnd: 4 }),
    );
    expect(result.stateUpdate.textValue).toBe('سلام ');
  });

  it('handles Shift+Space for ZWNJ', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Space', shiftKey: true }),
      makeState({ textValue: 'می', selectionStart: 2, selectionEnd: 2 }),
    );
    expect(result.stateUpdate.textValue).toContain('\u200C');
  });

  it('lets Ctrl+C pass through', () => {
    const result = keyboardFactory(makeEvent({ code: 'KeyC', ctrlKey: true }), makeState());
    expect(result).toBeNull();
  });

  it('lets Ctrl+V pass through', () => {
    const result = keyboardFactory(makeEvent({ code: 'KeyV', ctrlKey: true }), makeState());
    expect(result).toBeNull();
  });

  // CapsLock mode — non-letter keys
  it('CapsLock + Digit1 → English 1 (not ۱)', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Digit1' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('1');
  });

  it('CapsLock + Shift+Digit1 → !', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Digit1', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('!');
  });

  it('CapsLock + BracketLeft → [', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'BracketLeft' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('[');
  });

  it('CapsLock + Shift+BracketLeft → {', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'BracketLeft', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('{');
  });

  it('CapsLock + Semicolon → ;', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Semicolon' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe(';');
  });

  it('CapsLock + Quote → \'', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Quote' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe("'");
  });

  it('CapsLock + Shift+Quote → "', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Quote', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('"');
  });

  it('CapsLock + Comma → ,', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Comma' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe(',');
  });

  it('CapsLock + Shift+Comma → <', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Comma', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('<');
  });

  it('CapsLock + Shift+Period → >', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Period', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('>');
  });

  it('CapsLock + Shift+Slash → ?', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Slash', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('?');
  });

  it('CapsLock + Backquote → `', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Backquote' }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('`');
  });

  it('CapsLock + Shift+Backquote → ~', () => {
    const result = keyboardFactory(
      makeEvent({ code: 'Backquote', shiftKey: true }),
      makeState({ capsLock: true }),
    );
    expect(result.char).toBe('~');
  });
});
