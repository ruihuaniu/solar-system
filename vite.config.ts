import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from "path";

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures assets are loaded correctly when deployed
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
})