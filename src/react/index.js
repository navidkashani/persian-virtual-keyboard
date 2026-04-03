import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const PersianKeyboard = forwardRef(function PersianKeyboard(props, ref) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    // Ensure the web component is registered
    import('../persian-keyboard.js').catch(() => {});

    const el = document.createElement('persian-keyboard');
    instanceRef.current = el;

    // Set initial attributes
    const { showEnglishValue, showShiftedValue, disabled, readonly: ro } = propsRef.current;
    if (showEnglishValue) el.setAttribute('show-english-value', 'true');
    if (showShiftedValue) el.setAttribute('show-shifted-value', 'true');
    if (disabled) el.setAttribute('disabled', '');
    if (ro) el.setAttribute('readonly', '');

    // Proxy events
    el.addEventListener('persian-input', (e) => propsRef.current.onPersianInput?.(e));
    el.addEventListener('persian-change', (e) => propsRef.current.onPersianChange?.(e));
    el.addEventListener('persian-submit', (e) => propsRef.current.onPersianSubmit?.(e));

    containerRef.current.appendChild(el);

    return () => {
      el.remove();
      instanceRef.current = null;
    };
  }, []);

  // Sync attributes on prop changes
  useEffect(() => {
    const el = instanceRef.current;
    if (!el) return;

    if (props.showEnglishValue) {
      el.setAttribute('show-english-value', 'true');
    } else {
      el.removeAttribute('show-english-value');
    }

    if (props.showShiftedValue) {
      el.setAttribute('show-shifted-value', 'true');
    } else {
      el.removeAttribute('show-shifted-value');
    }

    if (props.disabled) {
      el.setAttribute('disabled', '');
    } else {
      el.removeAttribute('disabled');
    }

    if (props.readonly) {
      el.setAttribute('readonly', '');
    } else {
      el.removeAttribute('readonly');
    }
  }, [props.showEnglishValue, props.showShiftedValue, props.disabled, props.readonly]);

  useImperativeHandle(ref, () => ({
    getTextAreaValue: () => instanceRef.current?.getTextAreaValue() ?? '',
    resetValue: () => instanceRef.current?.resetValue(),
    setValue: (text) => instanceRef.current?.setValue(text),
    focus: () => instanceRef.current?.focus(),
    blur: () => instanceRef.current?.blur(),
  }));

  return React.createElement('div', { ref: containerRef, className: props.className });
});

export { PersianKeyboard };
