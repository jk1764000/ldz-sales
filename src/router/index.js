import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/active',
    component: Layout,
    redirect: '/active/list',
    name: 'active',
    meta: { title: '活动管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'activeList',
        component: () => import('@/views/active/list'),
        meta: { title: '活动列表', icon: 'table' }
      },
      {
        path: 'histroyActive',
        name: 'histroyActive',
        component: () => import('@/views/active/histroyActive'),
        meta: { title: '往期活动列表', icon: 'table' }
      },
      {
        path: 'addHistroyActive',
        hidden: true,
        name: 'addHistroyActive',
        component: () => import('@/views/active/addHistroyActive'),
        meta: { title: '新增往期活动列表', icon: 'table' }
      },
      {
        path: 'bmCompany',
        name: 'bmCompany',
        hidden: true,
        component: () => import('@/views/active/bmCompany'),
        meta: { title: '报名单位列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'activeAdd',
        hidden: true,
        component: () => import('@/views/active/add'),
        meta: { title: '创建活动', icon: 'table' }
      },
      {
        path: 'openScreen',
        name: 'openScreen',
        hidden: true,
        component: () => import('@/views/active/openScreen.vue'),
        meta: { title: '开屏展示页面', icon: 'el-icon-s-help' }
      },
      {
        path: 'ranking',
        name: 'ranking',
        hidden: true,
        component: () => import('@/views/active/ranking.vue'),
        meta: { title: '榜单列表页面', icon: 'el-icon-s-help' }
      },
      {
        path: 'activityContent',
        name: 'activityContent',
        hidden: true,
        component: () => import('@/views/active/activityContent.vue'),
        meta: { title: '活动内容页面', icon: 'el-icon-s-help' }
      },
    ]
  },
  {
    path: '/memberMange',
    component: Layout,
    redirect: '/memberMange/memberList',
    name: 'memberMange',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'memberList',
        name: 'memberMangeMemberList',
        component: () => import('@/views/memberMange/memberList.vue'),
        meta: { title: '用户列表', icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/company/companyList',
    name: 'memberMange',
    // hidden: true,
    meta: { title: '参展单位管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'companyList',
        name: 'companyList',
        // hidden: true,
        component: () => import('@/views/company/list.vue'),
        meta: { title: '参展单位列表', icon: 'el-icon-s-help' }
      },
      {
        path: 'companyAdd',
        name: 'companyAdd',
        hidden: true,
        component: () => import('@/views/company/add.vue'),
        meta: { title: '新增参展单位', icon: 'el-icon-s-help' }
      },

    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
