import Toast from './../../../../Toast'
import locale from './../../../../locale'
// 测试使用
// import Toast from 'seedsui-react/lib/Toast'
// import locale from 'seedsui-react/lib/locale'

import getRangeDates from './../../getRangeDates'

// 计算区间, 区间内
function validateRangeLimit(value, { dateRangeLimit, onError }) {
  if (!dateRangeLimit) return value
  let { startDate, endDate } = getRangeDates(value)
  if (!startDate || !endDate) {
    return value
  }
  const diff = startDate.diff(endDate)
  if (diff.days > dateRangeLimit) {
    let errMsg = locale(`日期区间不能超过${dateRangeLimit}天`, 'hint_error_dateragne_limit_date', [
      dateRangeLimit
    ])
    if (onError) {
      onError({
        errMsg: errMsg,
        dateRangeLimit: dateRangeLimit,
        value: value
      })
    } else {
      Toast.show({ content: errMsg, maskClickable: true })
    }
    return false
  }
  return value
}

export default validateRangeLimit
