import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Diary/',  // ← Đây là cái mới cần thay
  plugins: [
    tailwindcss()
  ],
});