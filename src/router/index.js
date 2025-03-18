import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/LoginSSRS.vue';
    
const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
},
{
    path: '/',
    redirect: '/login'
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');//获取token
  if (token || to.path === '/login') {//有token或者在login页面下通行
    next();
  } else {
    alert('无权访问');
    next('/login');
  }
})
export default router;
