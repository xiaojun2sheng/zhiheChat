import { createApp } from 'vue'
import './style.css'
import './style/hljs/index.css'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import stores from '@/stores'
import "@/style/tailwind.css"
import "@/style/index.scss"
import SvgIcon from "@/components/common/SvgIcon/index.vue"
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

// markDown 插件
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App)
app.use(stores)
app.use(VMdEditor);
app.use(router)
app.use(SvgIcon)
app.use(VueVideoPlayer)

app.mount('#app')
