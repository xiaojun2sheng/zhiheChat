import { createApp } from 'vue'
import './style.css'
import './style/hljs/index.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import stores from '@/stores'
import "@/style/tailwind.css"
import "@/style/index.scss"
import SvgIcon from "@/components/common/SvgIcon/index.vue"


const app = createApp(App)
app.use(stores)
app.use(router)
app.use(SvgIcon)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
