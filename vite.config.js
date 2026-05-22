import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsdelivrPlugin from './jsdelivr-plugin.js'

export default defineConfig({
  plugins: [react(), jsdelivrPlugin()],
  base: '/',
})
