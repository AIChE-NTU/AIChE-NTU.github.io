import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  // For HashRouter deployment, use root base path
  base: '/',
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