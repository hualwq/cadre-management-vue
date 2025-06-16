import { createRouter, createWebHistory } from 'vue-router';

import Login from '../components/LoginSSRS.vue';
import CadreInfo from '../components/CadreInfoForm.vue'
import PostAssessment from '../components/PostAssessment.vue'
import PostCadreposition from '../components/PostCadreposition'
import Getassessmentbypage from '../components/GetAssessment'
import Getcadreinfobypage from '../components/GetCadreinfo'
import GetPositionhistorybypage from '../components/GetPositionhistory'
import Getassessmentbyid from '../components/GetAssessmentbyid'
import Getcadreinfobyid from '../components/GetCadreinfobyid'
import GetPositionhistorybyid from '../components/GetPositionhistorybyid'
    
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
  {
    path: '/Cadreinfo',
    component: CadreInfo,
    name: CadreInfo
  },
  {
    path: '/postassessment',
    component: PostAssessment,
    name: PostAssessment
  },
  {
    path: '/postcadrepos',
    component: PostCadreposition,
    name: PostCadreposition
  },
  {
    path: '/getassessmentbypage',
    component: Getassessmentbypage,
    name: Getassessmentbypage
  },
  {
    path: '/getcadreinfobypage',
    component: Getcadreinfobypage,
    name: Getcadreinfobypage
  },
  {
    path: '/getphbypage',
    component: GetPositionhistorybypage,
    name: GetPositionhistorybypage
  },
  {
    path: '/getphbyid',
    component: GetPositionhistorybyid,
    name: GetPositionhistorybyid
  },
  {
    path: '/getcadreinfobyid',
    component: Getcadreinfobyid,
    name: Getcadreinfobyid
  },
  {
    path: '/getassessmentbyid',
    component: Getassessmentbyid,
    name: Getassessmentbyid
  }

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  const isLoginRoute = to.path === '/login';

  if (to.matched.some(record => record.meta.requireAuth)) {
    // 需要认证的路由
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else if (token && isLoginRoute) {
    // 已登录但访问登录页，重定向到首页
    next('/home');
  } else {
    // 其他情况放行
    next();
  }
});

export default router
