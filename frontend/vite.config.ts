import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      onLog(level, log, handler) {
        // lottie-web ships an expression engine that uses eval(). We only use
        // the light renderer, so that code is tree-shaken out, but the bundler
        // still warns while parsing the file.
        if (log.code === 'EVAL' && log.id?.includes('lottie-web')) return
        handler(level, log)
      },
    },
  },
})
