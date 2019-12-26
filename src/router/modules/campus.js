/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 校区管理路由模块
const campusRouter = {
  path: '/campus',
  component: Layout,
  redirect: '/campus/complex-table',
  name: 'campus',
  meta: {
    title: '校区管理',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/campus/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '老师信息列表', icon: 'education' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/campus/drag-table'),
      name: 'DragTable',
      meta: { title: '学生之星', icon: 'exit-fullscreen' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/campus/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '校长信箱', icon: 'guide' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/campus/complex-table'),
      name: 'ComplexTable',
      meta: { title: '学校动态', icon: 'international' }
    }
  ]
}
export default campusRouter
