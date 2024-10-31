// 内库使用
import DateUtil from './../../DateUtil'

// 测试使用
// import { DateUtil } from 'seedsui-react'

// 判断选中日期是否与rangeId相匹配, 不匹配则清空选中rangeId
function matchRangeId(value, { type, rangeId, ranges }) {
  let rangeDates = ranges[rangeId]
  if (
    DateUtil.compare(value?.[0], rangeDates?.[0], type) === 0 &&
    DateUtil.compare(value?.[1], rangeDates?.[1], type) === 0
  ) {
    return rangeId
  }
  return ''
}

export default matchRangeId
