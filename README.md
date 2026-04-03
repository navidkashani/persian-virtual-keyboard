# Persian Virtual Keyboard

[![npm version](https://img.shields.io/npm/v/persian-virtual-keyboard)](https://www.npmjs.com/package/persian-virtual-keyboard)
[![license](https://img.shields.io/npm/l/persian-virtual-keyboard)](./LICENSE)

A zero-dependency vanilla Web Component for typing Persian (Farsi) text in the browser. Uses the **ISIRI 9147** standard keyboard layout.

## Features

- **Zero dependencies** — vanilla `HTMLElement` + Shadow DOM
- **ISIRI 9147** standard Persian keyboard layout
- **ZWNJ support** — `Shift+Space` inserts Zero-Width Non-Joiner
- **CapsLock Latin toggle** — switches between Persian and Latin input
- **Physical keyboard interception** — type Persian using QWERTY keyboard
- **Dark mode** — automatic via `prefers-color-scheme`
- **Undo/Redo** — word-level grouping, 50-entry history
- **Character normalization** — Arabic Yeh/Kaf → Persian on paste
- **Responsive** — auto mobile layout at < 600px
- **Custom events** — `persian-input`, `persian-change`, `persian-submit`
- **CSS custom properties** — fully themeable
- **Multi-instance safe** — multiple keyboards on one page

## Installation

### npm
```bash
npm install persian-virtual-keyboard
```

### CDN (jsDelivr)
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/persian-virtual-keyboard/dist/persian-keyboard.js"></script>
```

## Development

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:5173
npm test             # Run tests
npm run build        # Production build
```

## Usage

### ES Module

```javascript
import 'persian-virtual-keyboard';
```

```html
<persian-keyboard></persian-keyboard>
```

### React

```javascript
import { PersianKeyboard } from 'persian-virtual-keyboard/react';

function App() {
  return (
    <PersianKeyboard
      showEnglishValue
      showShiftedValue
      onPersianChange={(e) => console.log(e.detail.value)}
    />
  );
}
```

## Attributes

| Attribute             | Type    | Default | Description                        |
| --------------------- | ------- | ------- | ---------------------------------- |
| `show-english-value`  | string  | —       | Show QWERTY position labels        |
| `show-shifted-value`  | string  | —       | Show shifted character labels      |
| `disabled`            | boolean | —       | Disable all interaction            |
| `readonly`            | boolean | —       | Text visible but not editable      |

## JavaScript API

```javascript
const kb = document.querySelector('persian-keyboard');

kb.getTextAreaValue();  // Returns current text
kb.setValue('سلام');     // Set text programmatically
kb.resetValue();        // Clear all text
kb.focus();             // Focus the textarea
kb.blur();              // Remove focus
```

## Events

```javascript
kb.addEventListener('persian-input', (e) => {
  console.log(e.detail.char);           // Character inserted
  console.log(e.detail.cursorPosition); // Cursor position
});

kb.addEventListener('persian-change', (e) => {
  console.log(e.detail.value);          // Full text content
});

kb.addEventListener('persian-submit', (e) => {
  console.log(e.detail.value);          // Text when Enter pressed
});
```

## Theming

All visual aspects are customizable via CSS custom properties:

```css
persian-keyboard {
  --button-background-color: #f0f0f3;
  --button-active-background-color: #d4d4db;
  --button-hover-background-color: #e4e4e9;
  --button-color: #1a1a2e;
  --button-shifted-color: #c2185b;
  --button-eng-color: #5c6bc0;
  --font-size: 18px;
  --row-height: 50px;
  --max-keyboard-width: 800px;
  --textarea-background-color: #ffffff;
  --font-family: "Tahoma", "Arial", sans-serif;
  --border-radius: 6px;
  --keyboard-row-gap: 4px;
}
```

Dark mode activates automatically based on `prefers-color-scheme`.

## Keyboard Shortcuts

| Shortcut              | Action                    |
| --------------------- | ------------------------- |
| `Shift+Space`         | Insert ZWNJ              |
| `CapsLock`            | Toggle Latin/Persian mode |
| `Ctrl/⌘+Z`           | Undo                      |
| `Ctrl/⌘+Shift+Z`     | Redo                      |
| `Ctrl/⌘+A/C/V/X`     | Select all / Copy / Paste / Cut |

## Browser Support

Modern evergreen browsers — last 2 versions of Chrome, Firefox, Safari, and Edge.

## License

MIT
