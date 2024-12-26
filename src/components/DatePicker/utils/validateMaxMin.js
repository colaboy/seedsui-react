// 内库使用-start
import locale from './../../../locale'
import DateUtil from './../../../DateUtil'
// 内库使用-end

/* 测试使用-start
import { locale, DateUtil } from 'seedsui-react'
测试使用-end */

// 日期纠正
function validateMaxMin(value, { type, min, max, onError } = {}) {
  // 非法值清空
  if (!value || value instanceof Date === false) {
    return null
  }

  if (min) {
    if (DateUtil.compare(value, min, type) === -1) {
      if (onError) {
        let isOk = onError({
          errCode: 'DATE_MIN_ERROR',
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
          min: min,
          value: value
        })
        if (isOk === true) return value
        return false
      }
      return min
    }
  }
  if (max) {
    if (DateUtil.compare(value, max, type) === 1) {
      if (onError) {
        let isOk = onError({
          errCode: 'DATE_MAX_ERROR',
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
          max: max,
          value: value
        })
        if (isOk === true) return value
        return false
      }
      return max
    }
  }
  return value
}

export default validateMaxMin
