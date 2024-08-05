
import { createRouter, createWebHistory } from 'vue-router';
 
// 引入你的组件
import Login from '../views/login.vue';
import List from '../views/list.vue';

 
// 定义路由
const routes = [
  { path: '/login', component: Login },
  { path: '/', component: List },
];
 
// 创建router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 
router.beforeEach((to, from, next) => {
  // 确认是否要继续路由跳转
  // if (Token) {
    next(); // 继续路由跳转
  // } else {
  //   // 取消路由跳转，并且可以导航到一个新的路由地址或当前路由
  //   next(false); // 取消跳转
  //   // 或者
  //   next('/login'); // 跳转到登录页面
  // }
});

export default router;