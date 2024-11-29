import getTypeLocale from './getTypeLocale'

// 内库使用
import locale from './../../../locale'
import DateUtil from './../../../DateUtil'

// 测试使用
// import { locale, DateUtil } from 'seedsui-react'

// 校验diff
function validateDiff(value, { type, diff, onError }) {
  if (value?.[0] instanceof Date === false || value?.[1] instanceof Date === false) {
    return value
  }

  let [startDate, endDate] = value
  let currentDiff = DateUtil.diff(endDate, startDate, type)
  if (currentDiff > 0) {
    currentDiff = currentDiff + 1
  }
  if (currentDiff > diff) {
    if (onError) {
      let isOk = onError({
        errMsg: locale(
          `日期区间不能超过${diff}${getTypeLocale(type)}`,
          'SeedsUI_dateragne_limit_error',
          [diff, getTypeLocale(type)]
        ),
        diff: diff,
        value: value
      })
      if (isOk === true) return value
      return false
    }
    return [startDate, DateUtil.add(startDate, diff, type)]
  }
  return value
}

export default validateDiff
