import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Diary/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Thêm để Vite hiểu cấu trúc
    rollupOptions: {
      input: 'index.html'  // Vite sẽ tìm index.html ở root
    }
  }
})