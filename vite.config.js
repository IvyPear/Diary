import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './', // Quan trọng: giúp GitHub Pages chạy đúng đường dẫn
  plugins: [
    tailwindcss()
  ],
});