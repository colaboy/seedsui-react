import getCustomRangeId from './../RangeMain/SelectorMain/getCustomRangeId'
import getDefaultRangeId from './../RangeMain/SelectorMain/getDefaultRangeId'

// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 显示名称
function getDisplayValue({ value, type, rangeId, ranges, separator }) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  // 显示别名
  if (rangeId) {
    // 正确的别名
    if (Array.isArray(ranges[rangeId])) {
      return rangeId
    }

    // 自定义别名
    return `${DateUtil.format(value[0], type)}${separator || ' ~ '}${DateUtil.format(
      value[1],
      type
    )}`
  }

  // 显示默认别名
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  if (defaultRangeId && Array.isArray(ranges[defaultRangeId])) {
    return defaultRangeId
  }

  // 显示自定义日期
  return `${DateUtil.format(value[0], type)}${separator || ' ~ '}${DateUtil.format(value[1], type)}`
}

export default getDisplayValue
