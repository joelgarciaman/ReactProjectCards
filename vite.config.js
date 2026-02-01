import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Esto crea un túnel: cuando pidas algo a /api, 
      // Vite lo enviará a Vercel por ti.
      '/api': {
        target: 'https://json-server-historias.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})