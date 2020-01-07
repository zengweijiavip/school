/**
 * 封装 获取页面标题 函数
 */

import defaultSettings from '@/settings'

const title = defaultSettings.title || '校园管理后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
