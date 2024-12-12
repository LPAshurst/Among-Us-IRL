import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  

  {
  base:"/343f24-final-project-amongus/",
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {chunkSizeWarningLimit: 1600},
}

)
