import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginSSRS.vue';
import CadreHome from '../components/CadreHome.vue';
import PostAssessment from '../components/PostAssessment.vue';
import PostCadreposition from '../components/PostCadreposition.vue';
import PostCadreInfo from '../components/PostCadreInfoForm.vue';

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
    path: '/home',
    component: () => {
      const role = localStorage.getItem('role');
      if (role === 'cadre') {
        return CadreHome;
      } else {
        // 可添加其他角色的默认页面
        return Login;
      }
    },
    children: [
      {
        path: 'post-assessment',
        component: PostAssessment
      },
      {
        path: 'post-cadreposition',
        component: PostCadreposition
      },
      {
        path: 'post-cadreinfo',
        component: PostCadreInfo
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token || to.path === '/login') {
    if (to.path.includes('/home') && role!== 'cadre') {
      alert('无权访问');
      next('/login');
    } else {
      next();
    }
  } else {
    alert('无权访问');
    next('/login');
  }
});

export default router;