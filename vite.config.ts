import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Force GitHub Pages base path for production builds
  base: (command === 'build' && mode === 'production') ? '/homepage.github.io/' : '/',
  server: {
    port: 3000
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  publicDir: 'public'
}))