import getDefaultRangeId from './../RangeMain/SelectorMain/getDefaultRangeId'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'seedsui-react'
测试使用-end */

// 判断选中日期是否与rangeId相匹配, 不匹配则清空选中rangeId
function matchRangeId(value, { type, rangeId, ranges }) {
  if (rangeId) {
    let rangeDates = ranges[rangeId]
    // 自定义项
    if (!Array.isArray(rangeDates)) {
      return rangeId
    }
    // 非自定义项
    if (
      DateUtil.compare(value?.[0], rangeDates?.[0], type) === 0 &&
      DateUtil.compare(value?.[1], rangeDates?.[1], type) === 0
    ) {
      return rangeId
    }
  }

  // rangeId未匹配成功, 则显示默认别名
  let defaultRangeId = getDefaultRangeId(value, ranges, type)
  if (defaultRangeId) {
    return defaultRangeId
  }

  return ''
}

export default matchRangeId
