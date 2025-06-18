import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginSSRS.vue';
import CadreHome from '../components/CadreHome.vue';
import PostAssessment from '../components/PostAssessment.vue';
import PostCadreposition from '../components/PostCadreposition.vue';
import PostCadreInfo from '../components/PostCadreInfoForm.vue';
import GetAssessmentbyid from '../components/GetAssessmentbyid.vue';
import GetAssessmentbypage from '../components/GetAssessment.vue';
import GetCadreinfobyid from '../components/GetCadreinfobyid.vue';
import GetCadreinfobypage from '../components/GetCadreinfo.vue';
import GetPositionhistorybyid from '../components/GetPositionhistorybyid.vue';
import GetPositionhistorybypage from '../components/GetPositionhistory.vue';
import AdminHome from '../components/AdminHome.vue'
import GetCadreposList from '../components/GetCadreposList.vue'
import GetCadreAssList from '../components/GetCadreAssList.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  // Admin 页面及子路由
  {
    path: '/home',
    component: AdminHome,
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
      },
      {
        path: 'get-cadreinfolist',
        component: GetCadreinfobypage
      },
      {
        path: 'post-assessmentlist',
        component: GetAssessmentbypage
      },
      {
        path: 'post-positionlist',
        component: GetPositionhistorybypage
      },
      {
        path: 'cadreinfobyid',
        component: GetCadreinfobyid,
        name: 'GetCadreinfobyid'
      },
      {
        path: 'assessmentbyid',
        component: GetAssessmentbyid,
        name: 'GetAssessmentbyid'
      },
      {
        path: 'positionhistorybyid',
        component: GetPositionhistorybyid,
        name: 'GetPositionhistorybyid'
      }
    ]
  },
  // Cadre 页面及子路由
  {
    path: '/cadrehome',
    component: CadreHome,
    children: [
      {
        path: 'post-assessment',
        component: PostAssessment,
        name: 'PostAssessment'
      },
      {
        path: 'post-cadreposition',
        component: PostCadreposition,
        name: 'PostCadreposition'
      },
      {
        path: 'post-cadreinfo',
        component: PostCadreInfo,
        name: 'PostCadreInfo'
      },
      {
        path: 'get-cadrepos',
        component: GetCadreposList
      },
      {
        path: 'get-assessment',
        component: GetCadreAssList
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫（可选：校验登录）
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('jwt_token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
