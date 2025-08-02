import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Smart base path detection:
  // - Production build for GitHub Pages: /homepage.github.io/
  // - Local development/preview: /
  base: command === 'build' && mode === 'production' 
    ? '/homepage.github.io/' 
    : '/',
  server: {
    port: 3000
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  publicDir: 'public'
}))