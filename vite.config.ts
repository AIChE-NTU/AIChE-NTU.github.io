import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // Always use the GitHub Pages base path for production builds
  base: command === 'build' ? '/AIChE-NTU.github.io/' : '/',
  server: {
    port: 3000
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  publicDir: 'public',
  // Ensure proper asset handling
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}))