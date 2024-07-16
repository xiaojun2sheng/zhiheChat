
import { createRouter, createWebHistory } from 'vue-router';
 
// 引入你的组件
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Video from '../views/video.vue';
import Music from '../views/music.vue';
import Image from '../views/image.vue';
import Chat from '../views/chat.vue';
 
// 定义路由
const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/video', component: Video },
  { path: '/music', component: Music },
  { path: '/image', component: Image },
  { path: '/chat', component: Chat },
];
 
// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
export default router;