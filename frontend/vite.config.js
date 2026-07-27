import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // allow importing dictionaries/*.json from the project root
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/usuarios': 'http://localhost:3000',
      '/registro': 'http://localhost:3000',
    },
  },
})
