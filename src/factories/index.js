import { letterFactory } from './letter.js';
import { numberFactory } from './number.js';
import { backspaceFactory } from './backspace.js';
import { spaceFactory } from './space.js';
import { tabFactory } from './tab.js';
import { enterFactory } from './enter.js';
import { punctuationFactory } from './punctuation.js';

/**
 * TaskMaster router: dispatches virtual key press to the appropriate factory.
 * @param {import('../constants/types.js').KeyButton} key - The key that was pressed
 * @param {import('../constants/types.js').KeyboardState} state - Current state
 * @param {boolean} shiftHeld - Whether shift is currently active
 * @returns {{ stateUpdate: Partial<import('../constants/types.js').KeyboardState>, sealGroup: boolean, char?: string } | null}
 */
export function taskMaster(key, state, shiftHeld) {
  const char = key.fa;

  switch (key.type) {
    case 'letter':
      return { stateUpdate: letterFactory(state, char), sealGroup: false, char };

    case 'number':
      return { stateUpdate: numberFactory(state, char), sealGroup: false, char };

    case 'punctuation':
      return { stateUpdate: punctuationFactory(state, char), sealGroup: true, char };

    case 'modifier':
      return handleModifier(key, state, shiftHeld);

    default:
      return null;
  }
}

function handleModifier(key, state, shiftHeld) {
  switch (key.fa) {
    case 'Backspace':
      return { stateUpdate: backspaceFactory(state), sealGroup: true };
    case 'Tab':
      return { stateUpdate: tabFactory(state), sealGroup: true, char: '\t' };
    case 'Enter':
      return { stateUpdate: enterFactory(state), sealGroup: true, char: '\n' };
    case ' ':
      return { stateUpdate: spaceFactory(state, shiftHeld), sealGroup: shiftHeld, char: shiftHeld ? 'ZWNJ' : ' ' };
    default:
      return null;
  }
}
