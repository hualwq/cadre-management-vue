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
import GetAssCadrebyid from '../components/GetAssCadrebyid.vue'
import GetPosCadrebyid from '../components/GetPosCadrebyid.vue'

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
      },
      {
        path: 'get-assessmentbyid',
        component: GetAssCadrebyid,
        name: 'GetAssCadrebyid'
      },
      {
        path: 'get-positionhistorybyid',
        component: GetPosCadrebyid,
        name: 'GetPosCadrebyid'
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


/* 
普通管理员
1，添加个人基本信息
2，添加任职证明
3，添加工作考核证明
4，查看个人信息信息待审核列表
5，查看待审核工作考核列表
6，查看待审核任职证明列表
7，审核个人信息（无法修改）
8，审核任职证明信息（无法修改）
9，审核工作考核信息（无法修改）
10，管理员home
*/

/*
普通用户
1，添加个人基本信息
2，添加任职证明
3，添加工作考核证明
4，查看并修改个人信息
5，查看个人的工作考核列表（复用管理员页面）
6，查看个人任职证明列表（复用管理员页面）
7，查看个人工作考核信息（可以修改）
8，查看个人任职证明信息（可以修改）
9，普通用户home
*/

/*
校级管理员
1，校级管理员home
2，查看所有用户列表
*/