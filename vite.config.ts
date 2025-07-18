import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue/',
  server:{
    host: true,
    proxy: {
      '/api': {
        target: 'https://data.ntpc.gov.tw',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  plugins: [
    alias(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['custom'].includes(tag),
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, "src"),
    }
  }
})
