import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // root: './src',
  // https://vitejs.dev/config/build-options.html
  build: {
    outDir: 'dist',
    // https://rollupjs.org/configuration-options/
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
        background: resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  publicDir: resolve(__dirname, 'public'),
})
