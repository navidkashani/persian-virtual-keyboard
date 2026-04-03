const MAX_HISTORY = 50;
const GROUP_TIMEOUT = 300; // ms

/**
 * Push a new entry to the undo history with word-level grouping.
 * Reads textValue and selectionEnd from state directly.
 * @param {import('../constants/types.js').KeyboardState} state
 * @param {boolean} [sealGroup=false] - Force-seal the current group
 */
export function pushHistory(state, sealGroup = false) {
  const now = Date.now();
  const { history, historyIndex, lastInputTime, groupOpen, textValue, selectionEnd } = state;

  // Truncate future entries if we undid then typed something new
  const truncateNeeded = historyIndex < history.length - 1;
  const base = truncateNeeded ? history.slice(0, historyIndex + 1) : history;

  const timeDiff = now - (lastInputTime || 0);
  const shouldSeal = sealGroup || timeDiff > GROUP_TIMEOUT || !groupOpen;

  const entry = { text: textValue, cursor: selectionEnd };
  let newHistory;

  if (shouldSeal || base.length === 0) {
    newHistory = truncateNeeded ? [...base, entry] : [...history, entry];
  } else {
    // Update the current group in place on the copy
    newHistory = truncateNeeded ? [...base.slice(0, -1), entry] : [...history.slice(0, -1), entry];
  }

  // Cap at MAX_HISTORY
  if (newHistory.length > MAX_HISTORY) {
    newHistory = newHistory.slice(newHistory.length - MAX_HISTORY);
  }

  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
    lastInputTime: now,
    groupOpen: !sealGroup,
  };
}

/**
 * Undo: go back one step in history.
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function undo(state) {
  const { history, historyIndex } = state;
  if (historyIndex <= 0) return {};

  const newIndex = historyIndex - 1;
  const entry = history[newIndex];

  return {
    textValue: entry.text,
    selectionStart: entry.cursor,
    selectionEnd: entry.cursor,
    selectedText: '',
    historyIndex: newIndex,
    groupOpen: false,
  };
}

/**
 * Redo: go forward one step in history.
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function redo(state) {
  const { history, historyIndex } = state;
  if (historyIndex >= history.length - 1) return {};

  const newIndex = historyIndex + 1;
  const entry = history[newIndex];

  return {
    textValue: entry.text,
    selectionStart: entry.cursor,
    selectionEnd: entry.cursor,
    selectedText: '',
    historyIndex: newIndex,
    groupOpen: false,
  };
}
