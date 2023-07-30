import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, "src"),
    }
  }
})
