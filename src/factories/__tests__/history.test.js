import { describe, it, expect, vi } from 'vitest';
import { pushHistory, undo, redo } from '../history.js';

function makeState(overrides = {}) {
  return {
    textValue: '',
    selectionStart: 0,
    selectionEnd: 0,
    history: [{ text: '', cursor: 0 }],
    historyIndex: 0,
    lastInputTime: 0,
    groupOpen: false,
    ...overrides,
  };
}

describe('pushHistory', () => {
  it('adds new entry to history', () => {
    const state = makeState({ textValue: 'س', selectionEnd: 1 });
    const result = pushHistory(state, true);
    expect(result.history).toHaveLength(2);
    expect(result.history[1]).toEqual({ text: 'س', cursor: 1 });
    expect(result.historyIndex).toBe(1);
  });

  it('groups rapid inputs', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const state = makeState({
      textValue: 'سل',
      selectionEnd: 2,
      history: [{ text: '', cursor: 0 }, { text: 'س', cursor: 1 }],
      historyIndex: 1,
      lastInputTime: now - 100,
      groupOpen: true,
    });

    const result = pushHistory(state, false);
    expect(result.history).toHaveLength(2);
    expect(result.history[1]).toEqual({ text: 'سل', cursor: 2 });

    vi.restoreAllMocks();
  });

  it('seals group after timeout', () => {
    const now = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const state = makeState({
      textValue: 'سلا',
      selectionEnd: 3,
      history: [{ text: '', cursor: 0 }, { text: 'سل', cursor: 2 }],
      historyIndex: 1,
      lastInputTime: now - 500,
      groupOpen: true,
    });

    const result = pushHistory(state, false);
    expect(result.history).toHaveLength(3);

    vi.restoreAllMocks();
  });

  it('truncates future entries after undo', () => {
    const state = makeState({
      textValue: 'سا',
      selectionEnd: 2,
      history: [
        { text: '', cursor: 0 },
        { text: 'س', cursor: 1 },
        { text: 'سل', cursor: 2 },
      ],
      historyIndex: 1,
    });

    const result = pushHistory(state, true);
    expect(result.history).toHaveLength(3);
    expect(result.history[2]).toEqual({ text: 'سا', cursor: 2 });
  });

  it('caps history at 50 entries', () => {
    const entries = Array.from({ length: 50 }, (_, i) => ({ text: String(i), cursor: i }));
    const state = makeState({
      textValue: 'new',
      selectionEnd: 3,
      history: entries,
      historyIndex: 49,
    });

    const result = pushHistory(state, true);
    expect(result.history.length).toBeLessThanOrEqual(50);
  });
});

describe('undo', () => {
  it('goes back one step', () => {
    const state = makeState({
      history: [
        { text: '', cursor: 0 },
        { text: 'سلام', cursor: 4 },
      ],
      historyIndex: 1,
    });

    const result = undo(state);
    expect(result.textValue).toBe('');
    expect(result.historyIndex).toBe(0);
  });

  it('no-op at beginning of history', () => {
    const state = makeState();
    const result = undo(state);
    expect(result).toEqual({});
  });
});

describe('redo', () => {
  it('goes forward one step', () => {
    const state = makeState({
      history: [
        { text: '', cursor: 0 },
        { text: 'سلام', cursor: 4 },
      ],
      historyIndex: 0,
    });

    const result = redo(state);
    expect(result.textValue).toBe('سلام');
    expect(result.historyIndex).toBe(1);
  });

  it('no-op at end of history', () => {
    const state = makeState({
      history: [
        { text: '', cursor: 0 },
        { text: 'سلام', cursor: 4 },
      ],
      historyIndex: 1,
    });

    const result = redo(state);
    expect(result).toEqual({});
  });
});
