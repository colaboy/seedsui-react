import getCustomRangeId from './../RangeMain/SelectorMain/getCustomRangeId'
import getDefaultRangeId from './../RangeMain/SelectorMain/getDefaultRangeId'

// 内库使用
import DateUtil from './../../DateUtil'

// 显示名称
function getDisplayValue({ value, type, rangeId, ranges, separator }) {
  let customRangeId = getCustomRangeId(ranges)
  // 有别名, 直接显示
  if (rangeId && rangeId !== customRangeId) {
    return rangeId
  }

  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  // 没有别名获取默认别名
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  if (rangeId !== defaultRangeId && ranges[defaultRangeId]) {
    return defaultRangeId
  }

  // 显示自定义日期
  return `${DateUtil.format(value[0], type)}${separator || ' ~ '}${DateUtil.format(value[1], type)}`
}

export default getDisplayValue
