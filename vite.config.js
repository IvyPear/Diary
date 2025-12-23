import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true }, // Xóa console.log ở production
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lucide'], // Tách nếu cần
        },
      },
    },
  },
});