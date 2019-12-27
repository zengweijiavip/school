import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// 引入校区管理路由模块
import campusRouter from './modules/campus'
// 引入考勤管理路由模块
import attendanceRouter from './modules/attendance'

/**
 * Note: sub-menu only appear when route children.length >= 1
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
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 没有权限要求的基本页
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 系统管理路由模块
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    // will always show the root menu
    // 总是显示根菜单
    alwaysShow: true,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'lock',
      // you can set roles in root nav
      // 可以在根导航中设置角色
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'email',
          // or you can only set roles in sub nav
          // 或者只在子导航中设置角色
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'role',
        meta: {
          title: '角色管理',
          icon: 'dict'
          // if do not set roles, means: this page does not require permission
          // 如果不设置角色，意味着:此页面不需要权限
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: 'drag',
          roles: ['admin']
        }
      },
      {
        path: 'dept',
        component: () => import('@/views/system/dept/index'),
        name: 'dept',
        meta: {
          title: '部门管理',
          icon: 'language'
        }
      },
      {
        path: 'post',
        component: () => import('@/views/system/post/index'),
        name: 'post',
        meta: {
          title: '岗位管理',
          icon: 'fullscreen'
        }
      },
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index'),
        name: 'dict',
        meta: {
          title: '字典管理',
          icon: 'message'
        }
      },
      {
        path: 'config',
        component: () => import('@/views/system/config/index'),
        name: 'config',
        meta: {
          title: '参数管理',
          icon: 'log'
        }
      },
      {
        path: 'notice',
        component: () => import('@/views/system/notice/index'),
        name: 'notice',
        meta: {
          title: '通知公告',
          icon: 'online'
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // 考勤管理路由模块
  attendanceRouter,
  // 校区管理路由模块
  campusRouter,

  // 收款管理路由模块
  {
    path: '/collection',
    component: Layout,
    redirect: '/collection/list',
    name: 'collection',
    meta: {
      title: '收款管理',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/collection/create'),
        name: 'create',
        meta: { title: '缴费项目', icon: 'edit' }
      },
      {
        path: 'edit',
        component: () => import('@/views/collection/edit'),
        name: 'edit',
        meta: { title: '缴费码', icon: 'edit' }
      },
      {
        path: 'list',
        component: () => import('@/views/collection/list'),
        name: 'list',
        meta: { title: '订单明细', icon: 'list' }
      }
    ]
  },

  // 外链路由模块
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        meta: { title: '校园介绍', icon: 'link' }
      }
    ]
  },

  // 404 页面必须放在最后 !!!
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
