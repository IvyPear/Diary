import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Quan trọng cho GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    port: 5173,
    open: true,
    host: true
  }
});