// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
// import { DateUtil } from 'seedsui-react'
测试使用-end */

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
      subTitle: DateUtil.format(date, type)
    }
  })
}

export default formatValue
