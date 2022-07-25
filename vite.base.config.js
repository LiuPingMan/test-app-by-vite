import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  envPrefix: 'ENV',
  optimizeDeps: {
    exclude: [], //将数组中的依赖不进行依赖预构建
  },
})
