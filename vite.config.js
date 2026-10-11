import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH: '/' kwa Vercel (default), '/-desc-point-stationery/' kwa GitHub Pages
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
