import getCustomRangeId from './../RangeMain/SelectorMain/getCustomRangeId'
import getDefaultRangeId from './../RangeMain/SelectorMain/getDefaultRangeId'

// 内库使用
import DateUtil from './../../DateUtil'

// 显示名称
function getDisplayValue({ value, type, rangeId, ranges, separator }) {
  // 自定义名称
  let customRangeId = getCustomRangeId(ranges)

  // 非自定义显示别名
  if (rangeId && rangeId !== customRangeId) {
    return rangeId
  }

  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  // 自定义显示日期
  if (rangeId && rangeId === customRangeId) {
    return `${DateUtil.format(value[0], type)}${separator || ' ~ '}${DateUtil.format(
      value[1],
      type
    )}`
  }

  // 显示默认别名
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  if (defaultRangeId && defaultRangeId !== customRangeId) {
    return defaultRangeId
  }

  // 显示自定义日期
  return `${DateUtil.format(value[0], type)}${separator || ' ~ '}${DateUtil.format(value[1], type)}`
}

export default getDisplayValue
