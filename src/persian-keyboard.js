import { STYLES } from './styles.js';
import {
  desktop_button_groups,
  shifted_desktop_button_groups,
  mobile_button_groups,
  shifted_mobile_button_groups,
  getEnFromCode,
} from './constants/layout.js';
import { taskMaster } from './factories/index.js';
import { keyboardFactory } from './factories/keyboard.js';
import { pasteFactory } from './factories/paste.js';
import { pushHistory } from './factories/history.js';

const sheet = new CSSStyleSheet();
sheet.replaceSync(STYLES);

function createInitialState() {
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
  };
}

class PersianKeyboard extends HTMLElement {
  static get observedAttributes() {
    return ['show-english-value', 'show-shifted-value', 'disabled', 'readonly'];
  }

  #state = createInitialState();
  #ac;
  #resizeObserver;
  #textarea;
  #keyboardContainer;
  #keyRefs = new Map();
  #isMobile = false;
  #showHelp = false;
  #helpOverlay = null;
  #ttsAvailable = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.#ac = new AbortController();
    const signal = this.#ac.signal;

    const container = document.createElement('div');
    container.className = 'container';

    this.#textarea = document.createElement('textarea');
    this.#textarea.className = 'textarea';
    this.#textarea.setAttribute('lang', 'fa');
    this.#textarea.setAttribute('dir', 'rtl');
    this.#textarea.setAttribute('rows', '5');
    this.#textarea.setAttribute('aria-label', 'Persian text input');
    container.appendChild(this.#textarea);

    this.#keyboardContainer = document.createElement('div');
    this.#keyboardContainer.className = 'keyboard';
    this.#keyboardContainer.setAttribute('role', 'group');
    this.#keyboardContainer.setAttribute('aria-label', 'Persian virtual keyboard');
    container.appendChild(this.#keyboardContainer);

    this.shadowRoot.appendChild(container);

    this.#ttsAvailable = typeof speechSynthesis !== 'undefined';
    this.#buildKeyboard(desktop_button_groups);
    this.#syncDisabledReadonly();
    this.#syncInputMode();

    // Revert any browser-initiated input — we manage text ourselves
    this.#textarea.addEventListener('input', () => {
      this.#textarea.value = this.#state.textValue;
      this.#textarea.setSelectionRange(this.#state.selectionStart, this.#state.selectionEnd);
    }, { signal });

    this.#textarea.addEventListener('keydown', (e) => this.#handleKeydown(e), { signal });
    this.#textarea.addEventListener('keyup', (e) => this.#handleKeyup(e), { signal });
    this.#textarea.addEventListener('paste', (e) => this.#handlePaste(e), { signal });
    this.#textarea.addEventListener('select', () => this.#syncCursorFromTextarea(), { signal });
    this.#textarea.addEventListener('click', () => this.#syncCursorFromTextarea(), { signal });
    this.#keyboardContainer.addEventListener('pointerdown', (e) => this.#handlePointerDown(e), { signal });

    this.#resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const wasMobile = this.#isMobile;
      this.#isMobile = width < 600;
      if (wasMobile !== this.#isMobile) {
        this.#switchLayout();
      }
    });
    this.#resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.#ac.abort();
    this.#resizeObserver?.disconnect();
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
  }

  attributeChangedCallback(name) {
    if (!this.#textarea) return;
    if (name === 'disabled' || name === 'readonly') {
      this.#syncDisabledReadonly();
    } else {
      // show-english-value or show-shifted-value changed
      this.#updateKeyLabels();
    }
  }

  // ── Public API ──

  getTextAreaValue() {
    return this.#state.textValue;
  }

  resetValue() {
    this.#state = createInitialState();
    this.#applyTextState();
    this.#dispatchChange();
  }

  setValue(text) {
    Object.assign(this.#state, {
      textValue: text,
      selectionStart: text.length,
      selectionEnd: text.length,
    });
    Object.assign(this.#state, pushHistory(this.#state, true));
    this.#applyTextState();
    this.#dispatchChange();
  }

  focus() {
    this.#textarea?.focus();
  }

  blur() {
    this.#textarea?.blur();
  }

  // ── Private: State Management ──

  #applyTextState() {
    if (this.#textarea.value !== this.#state.textValue) {
      this.#textarea.value = this.#state.textValue;
    }
    this.#textarea.setSelectionRange(this.#state.selectionStart, this.#state.selectionEnd);
  }

  #syncDisabledReadonly() {
    this.#textarea.disabled = this.hasAttribute('disabled');
    this.#textarea.readOnly = this.hasAttribute('readonly');
  }

  #syncInputMode() {
    if (this.#isMobile) {
      this.#textarea.setAttribute('inputmode', 'none');
    } else {
      this.#textarea.removeAttribute('inputmode');
    }
  }

  // ── Private: Keyboard Building ──

  #buildKeyboard(groups) {
    this.#keyboardContainer.innerHTML = '';
    this.#keyRefs.clear();

    for (const group of groups) {
      const row = document.createElement('div');
      row.className = `keyboard_row ${group.name}`;

      for (const btn of group.buttons) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `button ${btn.modifierClass || ''}`.trim();
        button.title = btn.title || '';
        button.setAttribute('tabindex', '-1');
        button.setAttribute('aria-label', btn.title || btn.label);
        button.dataset.en = btn.en;
        button.dataset.fa = btn.fa;
        button.dataset.type = btn.type;

        if (btn.type === 'audio' && !this.#ttsAvailable) {
          button.style.display = 'none';
        }

        this.#renderKeyContent(button, btn);

        const refKey = btn.en;
        if (refKey && !this.#keyRefs.has(refKey)) {
          this.#keyRefs.set(refKey, button);
        }

        row.appendChild(button);
      }

      this.#keyboardContainer.appendChild(row);
    }

    if (this.#state.capsLock) {
      this.#updateCapsLockVisual();
    }
  }

  #renderKeyContent(button, btn) {
    button.innerHTML = '';

    const showShifted = this.getAttribute('show-shifted-value') === 'true';
    const showEnglish = this.getAttribute('show-english-value') === 'true';

    if (showShifted && btn.shifted && btn.type !== 'modifier') {
      const shifted = document.createElement('span');
      shifted.className = 'shifted_value';
      shifted.textContent = btn.shifted;
      button.appendChild(shifted);
    }

    if (showEnglish && btn.en && btn.type !== 'modifier' && btn.type !== 'audio') {
      const english = document.createElement('span');
      english.className = 'english_value';
      english.textContent = btn.en.toUpperCase();
      button.appendChild(english);
    }

    const main = document.createElement('span');
    main.className = 'button_value';
    if (this.#state.capsLock && btn.type === 'letter') {
      main.textContent = btn.en.toUpperCase();
    } else {
      main.textContent = btn.label;
    }
    button.appendChild(main);
  }

  #updateKeyLabels() {
    for (const [, button] of this.#keyRefs) {
      const btn = {
        fa: button.dataset.fa,
        en: button.dataset.en,
        label: button.dataset.fa,
        type: button.dataset.type,
        shifted: '',
        modifierClass: '',
      };
      // Lookup full data for shifted value
      const groups = this.#getCurrentGroups();
      for (const group of groups) {
        const found = group.buttons.find((b) => b.en === btn.en && b.type === btn.type);
        if (found) { Object.assign(btn, found); break; }
      }
      this.#renderKeyContent(button, btn);
    }
  }

  #getCurrentGroups() {
    if (this.#isMobile) {
      return this.#state.shift ? shifted_mobile_button_groups : mobile_button_groups;
    }
    return this.#state.shift ? shifted_desktop_button_groups : desktop_button_groups;
  }

  #switchLayout() {
    this.#buildKeyboard(this.#getCurrentGroups());
    this.#syncInputMode();
  }

  // ── Private: Event Handlers ──

  #handlePointerDown(e) {
    const button = e.target.closest('.button');
    if (!button) return;

    e.preventDefault(); // Prevent textarea from losing focus

    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;

    const fa = button.dataset.fa;
    const type = button.dataset.type;
    const en = button.dataset.en;

    if (type === 'modifier') {
      if (fa === 'CapsLock') { this.#toggleCapsLock(); return; }
      if (fa === 'Shift') { this.#toggleShift(); return; }
      if (fa === 'Info') { this.#toggleHelp(); return; }
      if (fa === 'NumberToggle') { this.#state.shift = true; this.#switchLayout(); return; }
      if (fa === 'LetterToggle') { this.#state.shift = false; this.#switchLayout(); return; }
    }

    if (type === 'audio') { this.#speak(); return; }

    this.#syncCursorFromTextarea();

    // Find full key object from current layout
    const groups = this.#getCurrentGroups();
    let keyObj = null;
    for (const group of groups) {
      keyObj = group.buttons.find((b) => b.en === en && b.fa === fa);
      if (keyObj) break;
    }
    if (!keyObj) return;

    const result = taskMaster(keyObj, this.#state, this.#state.shift);
    if (!result) return;

    const { stateUpdate, sealGroup, char } = result;
    Object.assign(this.#state, stateUpdate);

    if (stateUpdate.textValue !== undefined) {
      Object.assign(this.#state, pushHistory(this.#state, sealGroup));
    }

    this.#applyTextState();
    this.#textarea.focus();

    if (char) this.#dispatchInput(char);
    if (stateUpdate.textValue !== undefined) this.#dispatchChange();
    if (char === '\n') this.#dispatchSubmit();

    this.#highlightKey(en);

    // Auto-release shift after a key press (not for CapsLock)
    if (this.#state.shift && !this.#state.capsLock) {
      this.#state.shift = false;
      this.#switchLayout();
    }
  }

  #handleKeydown(e) {
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;

    if (e.code === 'CapsLock') {
      this.#toggleCapsLock();
      e.preventDefault();
      return;
    }

    this.#syncCursorFromTextarea();

    const result = keyboardFactory(e, this.#state);
    if (!result) return;

    e.preventDefault();

    const { stateUpdate, sealGroup, char } = result;
    if (!stateUpdate || Object.keys(stateUpdate).length === 0) return;

    Object.assign(this.#state, stateUpdate);

    // Push to history (skip for undo/redo which manage their own history)
    if (stateUpdate.textValue !== undefined && stateUpdate.historyIndex === undefined) {
      Object.assign(this.#state, pushHistory(this.#state, sealGroup));
    }

    this.#applyTextState();

    if (char) this.#dispatchInput(char);
    if (stateUpdate.textValue !== undefined) this.#dispatchChange();
    if (char === '\n') this.#dispatchSubmit();

    const en = getEnFromCode(e.code);
    if (en) this.#highlightKey(en);
  }

  #handleKeyup(e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (this.#state.shift && !this.#isMobile) {
        this.#state.shift = false;
      }
    }
  }

  #handlePaste(e) {
    if (this.hasAttribute('disabled') || this.hasAttribute('readonly')) return;

    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain');
    if (!text) return;

    this.#syncCursorFromTextarea();

    Object.assign(this.#state, pasteFactory(this.#state, text));
    Object.assign(this.#state, pushHistory(this.#state, true));

    this.#applyTextState();
    this.#dispatchChange();
  }

  #syncCursorFromTextarea() {
    this.#state.selectionStart = this.#textarea.selectionStart;
    this.#state.selectionEnd = this.#textarea.selectionEnd;
  }

  // ── Private: CapsLock & Shift ──

  #toggleCapsLock() {
    this.#state.capsLock = !this.#state.capsLock;
    this.#updateCapsLockVisual();
    this.#updateKeyLabels();
  }

  #updateCapsLockVisual() {
    const capsBtn = this.#keyRefs.get('CapsLock');
    if (capsBtn) {
      capsBtn.classList.toggle('capslock-active', this.#state.capsLock);
      const mainLabel = capsBtn.querySelector('.button_value');
      if (mainLabel) {
        mainLabel.textContent = this.#state.capsLock ? 'EN' : 'CapsLock';
      }
    }
  }

  #toggleShift() {
    this.#state.shift = !this.#state.shift;
    this.#switchLayout();
  }

  // ── Private: Key Highlight ──

  #highlightKey(en) {
    const button = this.#keyRefs.get(en);
    if (!button) return;

    button.classList.remove('highlight');
    void button.offsetWidth;
    button.classList.add('highlight');

    button.addEventListener('animationend', () => {
      button.classList.remove('highlight');
    }, { once: true });
  }

  // ── Private: TTS ──

  #speak() {
    if (!this.#ttsAvailable) return;

    // Compute selected text on demand instead of tracking in state
    const { selectionStart, selectionEnd, textValue } = this.#state;
    const selected = selectionStart !== selectionEnd
      ? textValue.slice(selectionStart, selectionEnd)
      : '';
    const text = selected || textValue;
    if (!text) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fa-IR';
    speechSynthesis.speak(utterance);
  }

  // ── Private: Help Dialog ──

  #toggleHelp() {
    this.#showHelp = !this.#showHelp;

    if (this.#showHelp) {
      this.#helpOverlay = document.createElement('div');
      this.#helpOverlay.className = 'help-overlay';
      this.#helpOverlay.innerHTML = `
        <div class="help-dialog">
          <h3>راهنمای کلیدهای میانبر</h3>
          <p><kbd>Shift</kbd> + <kbd>Space</kbd> — نیم‌فاصله (ZWNJ)</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>Z</kbd> — واگرد (Undo)</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> — بازگرد (Redo)</p>
          <p><kbd>CapsLock</kbd> — تغییر به حروف لاتین/فارسی</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>A</kbd> — انتخاب همه</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>C</kbd> — کپی</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>V</kbd> — چسباندن</p>
          <p><kbd>Ctrl/⌘</kbd> + <kbd>X</kbd> — برش</p>
          <button class="close-btn">بستن</button>
        </div>
      `;

      this.#helpOverlay.addEventListener('click', (e) => {
        if (e.target === this.#helpOverlay || e.target.classList.contains('close-btn')) {
          this.#toggleHelp();
        }
      }, { signal: this.#ac.signal });

      this.shadowRoot.querySelector('.container').appendChild(this.#helpOverlay);
    } else if (this.#helpOverlay) {
      this.#helpOverlay.remove();
      this.#helpOverlay = null;
    }
  }

  // ── Private: Custom Events ──

  #dispatchInput(char) {
    this.dispatchEvent(new CustomEvent('persian-input', {
      bubbles: true,
      composed: true,
      detail: { char, cursorPosition: this.#state.selectionEnd },
    }));
  }

  #dispatchChange() {
    this.dispatchEvent(new CustomEvent('persian-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.#state.textValue },
    }));
  }

  #dispatchSubmit() {
    this.dispatchEvent(new CustomEvent('persian-submit', {
      bubbles: true,
      composed: true,
      detail: { value: this.#state.textValue },
    }));
  }
}

customElements.define('persian-keyboard', PersianKeyboard);

export { PersianKeyboard };
