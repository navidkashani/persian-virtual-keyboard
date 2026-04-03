import { getKeyFromCode, getLatinFromCode } from '../constants/layout.js';
import { letterFactory } from './letter.js';
import { numberFactory } from './number.js';
import { punctuationFactory } from './punctuation.js';
import { backspaceFactory, deleteSelection } from './backspace.js';
import { spaceFactory } from './space.js';
import { enterFactory } from './enter.js';
import { undo, redo } from './history.js';

/**
 * Handle physical keyboard event. Maps event.code to Persian character.
 * Returns null if the event should not be intercepted (let browser handle it).
 * @param {KeyboardEvent} e
 * @param {import('../constants/types.js').KeyboardState} state
 */
export function keyboardFactory(e, state) {
  if (e.isComposing) return null;
  if (e.altKey) return null;

  const isMeta = e.metaKey || e.ctrlKey;

  if (isMeta) {
    switch (e.code) {
      case 'KeyA':
      case 'KeyC':
      case 'KeyV':
      case 'KeyX':
        return null;
      case 'KeyZ':
        if (e.shiftKey) {
          return { stateUpdate: redo(state), sealGroup: true };
        }
        return { stateUpdate: undo(state), sealGroup: true };
      default:
        return null;
    }
  }

  // Don't intercept navigation/modifier keys
  if (e.code === 'Tab' || e.code === 'Escape') return null;
  if (e.code.startsWith('Arrow')) return null;
  if (e.code.startsWith('F') && e.code.length <= 3) return null;
  if (e.code === 'Home' || e.code === 'End' || e.code === 'PageUp' || e.code === 'PageDown') return null;
  if (e.code === 'CapsLock') return null;
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') return null;
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') return null;
  if (e.code === 'MetaLeft' || e.code === 'MetaRight') return null;
  if (e.code === 'AltLeft' || e.code === 'AltRight') return null;

  // CapsLock Latin mode
  if (state.capsLock) {
    const latin = getLatinFromCode(e.code, e.shiftKey);
    if (latin) {
      return { stateUpdate: letterFactory(state, latin), sealGroup: false, char: latin };
    }
  }

  if (e.code === 'Space') {
    return { stateUpdate: spaceFactory(state, e.shiftKey), sealGroup: e.shiftKey, char: e.shiftKey ? 'ZWNJ' : ' ' };
  }

  if (e.code === 'Backspace') {
    return { stateUpdate: backspaceFactory(state), sealGroup: true };
  }

  if (e.code === 'Enter') {
    return { stateUpdate: enterFactory(state), sealGroup: true, char: '\n' };
  }

  if (e.code === 'Delete') {
    return handleDelete(state);
  }

  const key = getKeyFromCode(e.code, e.shiftKey);
  if (!key) return null;

  const char = key.fa;
  if (!char || char === 'Backspace' || char === 'Tab' || char === 'Enter' ||
      char === 'Shift' || char === 'CapsLock') {
    return null;
  }

  switch (key.type) {
    case 'letter':
      return { stateUpdate: letterFactory(state, char), sealGroup: false, char };
    case 'number':
      return { stateUpdate: numberFactory(state, char), sealGroup: false, char };
    case 'punctuation':
      return { stateUpdate: punctuationFactory(state, char), sealGroup: true, char };
    default:
      return { stateUpdate: letterFactory(state, char), sealGroup: false, char };
  }
}

function handleDelete(state) {
  const selResult = deleteSelection(state);
  if (selResult) return { stateUpdate: selResult, sealGroup: true };

  const { textValue, selectionStart } = state;
  if (selectionStart >= textValue.length) return { stateUpdate: {}, sealGroup: false };

  // Surrogate pair forward-delete
  const code = textValue.charCodeAt(selectionStart);
  const deleteCount = (code >= 0xD800 && code <= 0xDBFF) ? 2 : 1;

  return {
    stateUpdate: {
      textValue: textValue.slice(0, selectionStart) + textValue.slice(selectionStart + deleteCount),
      selectionStart,
      selectionEnd: selectionStart,
      selectedText: '',
    },
    sealGroup: true,
  };
}
