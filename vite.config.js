import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'persian-keyboard': resolve(__dirname, 'src/persian-keyboard.js'),
        'react/index': resolve(__dirname, 'src/react/index.js'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
    },
  },
  test: {
    environment: 'jsdom',
  },
});
