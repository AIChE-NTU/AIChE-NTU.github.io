import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/homepage.github.io/', // For project pages: https://aiche-ntu.github.io/homepage.github.io/
})
