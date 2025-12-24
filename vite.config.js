import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Diary/',  // CHO GITHUB PAGES
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
