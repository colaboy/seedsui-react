import getTypeLocale from './getTypeLocale'

// 内库使用
import locale from './../../../locale'
import DateUtil from './../../../DateUtil'

// 测试使用
// import { locale, DateUtil } from 'seedsui-react'

// 校验diff
function validateDiff(value, { type, diff, onError }) {
  let [startDate, endDate] = value || [null, null]
  let currentDiff = DateUtil.diff(startDate, endDate, type)
  if (currentDiff > diff) {
    if (onError) {
      locale(`日期区间不能超过${diff}${getTypeLocale(type)}`, 'SeedsUI_dateragne_limit_error', [
        diff,
        getTypeLocale(type)
      ])
      return false
    }
    return [startDate, DateUtil.add(startDate, diff, type)]
  }
  return value
}

export default validateDiff
