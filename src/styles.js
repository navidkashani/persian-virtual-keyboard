export const STYLES = `
:host {
  display: block;
  min-width: 280px;
  font-family: var(--font-family, "Tahoma", "Arial", sans-serif);
  font-size: var(--font-size, 18px);
  direction: ltr;
  contain: layout style;
}

/* ── Textarea ── */
.textarea {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  direction: rtl;
  text-align: right;
  font-family: inherit;
  font-size: inherit;
  padding: 10px;
  border: 1px solid #d4d4db;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  background: var(--textarea-background-color, #ffffff);
  color: var(--button-color, #1a1a2e);
  line-height: 1.6;
}

.textarea:focus {
  border-color: #4a6cf7;
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.25);
}

.textarea[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.textarea[readonly] {
  background: var(--textarea-background-color, #f5f5f5);
}

/* ── Keyboard Container ── */
.keyboard {
  margin-top: 8px;
  max-width: var(--max-keyboard-width, 800px);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

/* ── Keyboard Row ── */
.keyboard_row {
  display: grid;
  gap: var(--keyboard-row-gap, 4px);
  margin-bottom: var(--keyboard-row-gap, 4px);
  height: var(--row-height, 50px);
}

/* Desktop grid layouts */
.keyboard_row.first_row {
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
}
.keyboard_row.second_row {
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.keyboard_row.third_row {
  grid-template-columns: 2.2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2.2fr;
}
.keyboard_row.fourth_row {
  grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2.5fr;
}
.keyboard_row.fifth_row {
  grid-template-columns: 1.5fr 9fr 1.5fr;
}

/* Mobile grid layouts */
.keyboard_row.first_row_mobile {
  grid-template-columns: repeat(10, 1fr);
}
.keyboard_row.second_row_mobile {
  grid-template-columns: repeat(10, 1fr);
}
.keyboard_row.third_row_mobile {
  grid-template-columns: repeat(11, 1fr);
}
.keyboard_row.fourth_row_mobile {
  grid-template-columns: 1.5fr 5fr 1.5fr;
}

/* ── Button Base ── */
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  border: 1px solid transparent;
  border-radius: var(--border-radius, 6px);
  background: var(--button-background-color, #f0f0f3);
  color: var(--button-color, #1a1a2e);
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0;
  margin: 0;
  outline: none;
  transition: background-color 0.1s ease;
  -webkit-tap-highlight-color: transparent;
}

.button:hover {
  background: var(--button-hover-background-color, #e4e4e9);
}

.button:active,
.button.active {
  background: var(--button-active-background-color, #d4d4db);
}

.button[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Key Labels ── */
.button_value {
  margin: 0;
  font-size: 1em;
  line-height: 1;
}

.shifted_value {
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 0.55em;
  color: var(--button-shifted-color, #c2185b);
  line-height: 1;
  pointer-events: none;
}

.english_value {
  position: absolute;
  top: 3px;
  left: 5px;
  font-size: 0.55em;
  color: var(--button-eng-color, #5c6bc0);
  line-height: 1;
  pointer-events: none;
}

/* ── Modifier Keys ── */
.button.wider {
  font-size: 0.75em;
}

.button.space {
  font-size: 0.75em;
}

.button.info,
.button.audio {
  font-size: 0.85em;
}

.button.capslock-active {
  background: var(--button-active-background-color, #d4d4db);
  box-shadow: inset 0 0 0 2px #4a6cf7;
}

/* ── Key Highlight Animation ── */
@keyframes key-flash {
  0% { background: var(--button-active-background-color, #d4d4db); }
  100% { background: var(--button-background-color, #f0f0f3); }
}

.button.highlight {
  animation: key-flash 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .button.highlight {
    animation: none;
    background: var(--button-active-background-color, #d4d4db);
  }
}

/* ── Disabled / Readonly States ── */
:host([disabled]) .keyboard {
  opacity: 0.4;
  pointer-events: none;
}

:host([readonly]) .keyboard {
  opacity: 0.6;
  pointer-events: none;
}

/* ── Help Modal ── */
.help-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.help-dialog {
  background: var(--textarea-background-color, #ffffff);
  color: var(--button-color, #1a1a2e);
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  font-size: 0.85em;
  direction: rtl;
  text-align: right;
  line-height: 1.8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.help-dialog h3 {
  margin: 0 0 10px;
  font-size: 1.1em;
}

.help-dialog kbd {
  background: var(--button-background-color, #f0f0f3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
  border: 1px solid #d4d4db;
}

.help-dialog .close-btn {
  display: block;
  margin: 12px auto 0;
  padding: 6px 20px;
  border: none;
  border-radius: 6px;
  background: var(--button-background-color, #f0f0f3);
  color: var(--button-color, #1a1a2e);
  cursor: pointer;
  font-family: inherit;
}

/* ── Dark Mode ── */
@media (prefers-color-scheme: dark) {
  .textarea {
    background: var(--textarea-background-color, #1e1e2a);
    color: var(--button-color, #e2e2ec);
    border-color: #4a4a5e;
  }

  .textarea:focus {
    border-color: #7c8cf8;
    box-shadow: 0 0 0 2px rgba(124, 140, 248, 0.3);
  }

  .textarea[readonly] {
    background: var(--textarea-background-color, #282835);
  }

  .button {
    background: var(--button-background-color, #2d2d3a);
    color: var(--button-color, #e2e2ec);
  }

  .button:hover {
    background: var(--button-hover-background-color, #3c3c4d);
  }

  .button:active,
  .button.active {
    background: var(--button-active-background-color, #4a4a5e);
  }

  .shifted_value {
    color: var(--button-shifted-color, #f06292);
  }

  .english_value {
    color: var(--button-eng-color, #9fa8da);
  }

  .help-dialog {
    background: var(--textarea-background-color, #1e1e2a);
    color: var(--button-color, #e2e2ec);
  }

  .help-dialog kbd {
    background: var(--button-background-color, #2d2d3a);
    border-color: #4a4a5e;
  }

  .help-dialog .close-btn {
    background: var(--button-background-color, #2d2d3a);
    color: var(--button-color, #e2e2ec);
  }

  @keyframes key-flash {
    0% { background: var(--button-active-background-color, #4a4a5e); }
    100% { background: var(--button-background-color, #2d2d3a); }
  }
}

/* ── Print ── */
@media print {
  .keyboard {
    display: none !important;
  }
}

/* ── Forced Colors (High Contrast) ── */
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;
  }
}

/* ── Host Container ── */
.container {
  position: relative;
}
`;
