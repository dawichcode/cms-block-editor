import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cms/cms-block-editor': path.resolve(__dirname, '../src/index.ts'),
    },
  },
});
