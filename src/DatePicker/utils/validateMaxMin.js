// 内库使用
import locale from './../../locale'
import DateUtil from './../../DateUtil'

// 测试使用
// import { locale, DateUtil } from 'seedsui-react'

// 日期纠正
function validateMaxMin(value, config = {}) {
  const type = config.type
  const min = config.min
  const max = config.max
  const onError = config.onError

  if (value instanceof Date === false) {
    console.log('DatePicker.Modal-Utils.validateMaxMin:非法的value')
    return onError ? false : min || max
  }

  if (min) {
    if (DateUtil.compare(value, min, type) === -1) {
      if (onError) {
        onError({
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
          min: min,
          value: value
        })
        return false
      }
      // eslint-disable-next-line
      value = min
    }
  }
  if (max) {
    if (DateUtil.compare(value, max, type) === 1) {
      if (onError) {
        onError({
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
          max: max,
          value: value
        })
        return false
      }
      // eslint-disable-next-line
      value = max
    }
  }
  return value
}

export default validateMaxMin
