// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

// 获取显示名称
function getDisplayValue(value, { maxCount, precision } = {}) {
  // Date
  if (value instanceof Date) {
    return DateUtil.format(value, 'YYYY-MM-DD')
  }

  // Array
  if (Array.isArray(value)) {
    // Date Range
    if (value.length === 2 && value[0] instanceof Date && value[1] instanceof Date) {
      return `${DateUtil.format(value[0], 'YYYY-MM-DD')} ~ ${DateUtil.format(
        value[1],
        'YYYY-MM-DD'
      )}`
    }

    // Select
    let displayValue = value.map((item) => {
      if (item instanceof Date) {
        return DateUtil.format(item, 'YYYY-MM-DD')
      } else if (typeof item === 'object') {
        return item.name || ''
      }
      return item
    })
    let count = value.length
    if (maxCount && count > maxCount) {
      displayValue = displayValue.splice(0, maxCount)
      return `${displayValue.join(',')}+${count}`
    }
    return value.join(',')
  }

  // Base type
  if (typeof value !== 'string' && typeof value !== 'number') {
    return ''
  }

  // Fixed number
  if (typeof precision === 'number' && typeof value === 'number') {
    return Number(value).toFixed(precision)
  }

  return value
}

export default getDisplayValue
