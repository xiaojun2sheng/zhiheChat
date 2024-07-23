import { defineConfig } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver(), ElementPlusResolver()],
    }),
    vue(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8020,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 假设你的源代码在 'src' 目录下
    },
  },
  envDir: "./",
})
