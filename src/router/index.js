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
    path: '/system/',
    component: Layout,
    name: "systemManger",
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'index',
        name: 'systemindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '企业基本信息设置', icon: 'el-icon-monitor' }
      }
    ],
  },
  {
    path: '/shop/',
    component: Layout,
    name: "shopManger",
    meta: { title: '供应商自营', icon: 'el-icon-s-check' },
    children: [
      {
        path: 'index',
        name: 'shopindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '供应商首营（药品）', icon: 'el-icon-user' }
      },
      {
        path: 'indexname',
        name: 'shopindexname',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '供应商首营（器械）', icon: 'el-icon-user-solid' }
      },
    ],
  },
  {
    path: '/shopping/',
    component: Layout,
    name: "shoppingManger",
    meta: { title: '商品首营', icon: 'el-icon-present' },
    children: [
      {
        path: 'index',
        name: 'shoppingindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '首营商品（药品）', icon: 'el-icon-box' }
      },
      {
        path: 'indexname',
        name: 'shoppingindexname',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '商品首营（器械）', icon: 'el-icon-sold-out' }
      },
    ],
  },
  {
    path: '/shopgo/',
    component: Layout,
    name: "shopgoManger",
    meta: { title: '供应商拜访', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'index',
        name: 'shopgoindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '预约拜访（供应商）', icon: 'el-icon-user-solid' }
      },
    ],
  },
  {
    path: '/shoppingPush/',
    component: Layout,
    name: "shoppingPushManger",
    meta: { title: '商品信息推送', icon: 'el-icon-message-solid' },
    children: [
      {
        path: 'index',
        name: 'shoppingPushindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '新品信息推送', icon: 'el-icon-message-solid' }
      },
    ],
  },
  {
    path: '/shoppingsource/',
    component: Layout,
    name: "shoppingsourceManger",
    meta: { title: '寻源协同', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'shoppingsourceindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '询价单管理', icon: 'dashboard' }
      },
      {
        path: 'zhaobiao',
        name: 'shoppingsourcezhaobiao',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '销售方招标管理', icon: 'dashboard' }
      },
    ],
  },
  {
    path: '/back/',
    component: Layout,
    name: "backManger",
    meta: { title: '返利管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'backindex',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '返利结果管理', icon: 'dashboard' }
      }
    ],
  },
  {
    path: '/user/',
    component: Layout,
    redirect: '/user/index',
    name: 'memberMange',
    meta: { title: '报表管理', icon: 'el-icon-coin' },
    children: [
      {
        path: 'index',
        name: 'userindex',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '销售退货', icon: 'table' }
      },
      {
        path: 'pull',
        name: 'userpull',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '入库退货', icon: 'el-icon-folder' }
      },
      {
        path: 'retail',
        name: 'userretail',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '零售', icon: 'el-icon-film' }
      },
      {
        path: 'kucun',
        name: 'userkucun',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '库存', icon: 'el-icon-document-remove' }
      },
      {
        path: 'mxibiao',
        name: 'usermxibiao',
        component: () => import('@/views/noquanxian.vue'),
        meta: { title: '退货明细报表', icon: 'el-icon-tickets' }
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
