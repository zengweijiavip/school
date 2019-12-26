/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 考勤管理路由模块
const attendanceRouter = {
  path: '/attendance',
  component: Layout,
  redirect: '/attendance/menu1/menu1-1',
  name: 'attendance',
  meta: {
    title: '考勤管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/attendance/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '人员绑定查询', icon: 'build' },
      redirect: '/attendance/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/attendance/menu1/menu1-1'),
          name: 'Menu1-1',
          meta: { title: '费用对账报表', icon: 'bug' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/attendance/menu1/menu1-2'),
          name: 'Menu1-2',
          redirect: '/attendance/menu1/menu1-2/menu1-2-1',
          meta: { title: '考勤记录查询', icon: 'date' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/attendance/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: '线上考勤记录', icon: 'dict' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/attendance/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: '学生请假记录', icon: 'excel' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/attendance/menu1/menu1-3'),
          name: 'Menu1-3',
          meta: { title: '自助充值统计表', icon: 'chart' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/attendance/menu2/index'),
      meta: { title: '访问日志', icon: 'code' }
    }
  ]
}

export default attendanceRouter
