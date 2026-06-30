import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lvyi-ai/',
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
