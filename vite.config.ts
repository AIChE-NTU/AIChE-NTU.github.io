import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hompage.github.io/', // IMPORTANT: Replace 'your-repository-name' with your actual GitHub repository name.
})
