import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './', // This ensures assets are loaded correctly with relative paths
  build: {
    outDir: 'docs', // Output to docs folder for GitHub Pages
    emptyOutDir: true, // Clean the output directory before each build
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          colors: [
            './src/algorithms/colorModels/conversions.ts',
            './src/algorithms/colorModels/hsl.ts',
            './src/algorithms/colorModels/lab.ts',
            './src/algorithms/colorModels/rgb.ts',
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
