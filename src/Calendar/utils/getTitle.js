// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 获取标题字符串
function getTitle(activeDate, titleFormatter, info) {
  if (!activeDate) {
    return ''
  }
  let title = ''
  if (typeof titleFormatter === 'function') {
    title = titleFormatter(activeDate, info)
  } else {
    let format = typeof titleFormatter === 'string' ? titleFormatter : 'YYYY-MM'
    debugger
    title = DateUtil.formatDate(activeDate, format)
  }

  return title
}
export default getTitle
