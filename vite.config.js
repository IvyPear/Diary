import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',  // Dùng './' cho local, đổi thành '/Diary/' khi deploy Project Pages
  plugins: [
    tailwindcss(),
  ],
});