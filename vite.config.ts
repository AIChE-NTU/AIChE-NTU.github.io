import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Ensure production builds always use GitHub Pages base path
  base: command === 'build' ? '/homepage.github.io/' : '/',
  server: {
    port: 3000
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  publicDir: 'public'
}))