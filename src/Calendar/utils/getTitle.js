// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 获取标题字符串
function getTitle(drawDate, titleFormatter, otherInfo) {
  if (!drawDate) {
    return ''
  }
  let title = ''
  if (typeof titleFormatter === 'function') {
    title = titleFormatter(drawDate, otherInfo)
  } else {
    let format = typeof titleFormatter === 'string' ? titleFormatter : 'YYYY-MM'
    title = DateUtil.format(drawDate, format)
  }

  return title
}
export default getTitle
