// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

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
