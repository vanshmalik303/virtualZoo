import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so the built index.html works when
  // Electron loads it directly from disk via loadFile()
  base: './',
})
