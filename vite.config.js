import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html'
      // XÓA hoặc sửa dòng chart: [...]
    }
  },
  server: {
    port: 5173,
    open: true
  }
});