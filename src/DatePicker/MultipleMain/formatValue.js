// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// Format value
function formatValue(value, type) {
  if (!Array.isArray(value) || !value.length) {
    return null
  }
  return value.map((tab) => {
    let date = tab.value instanceof Date ? tab.value : new Date()
    return {
      ...tab,
      value: date,
      sndcaption: DateUtil.format(date, type)
    }
  })
}

export default formatValue
