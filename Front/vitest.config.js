/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { Buffer } from "buffer";

export default defineConfig({
  plugins: [
    vue()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/tests-setup.ts']
  },
  resolve: {
    alias: {
      '@': './'
    }
  },
  define: {
    global: {
      Buffer: Buffer,
    },
  },
})
