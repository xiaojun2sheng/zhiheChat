import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8020
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 假设你的源代码在 'src' 目录下
    }
  },
  envDir: './',
})

