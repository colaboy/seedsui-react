import Toast from './../../Toast'
import locale from './../../locale'
// 测试使用
// import Toast from 'seedsui-react/lib/Toast'
// import locale from 'seedsui-react/lib/locale'

import getDates from './../RangeModal/getDates'

// 计算区间, 区间内
function validateDaysLimit(value, { daysLimit, onError }) {
  if (!daysLimit) return value
  let { startDate, endDate } = getDates(value)
  if (!startDate || !endDate) {
    return value
  }
  const diff = startDate.diff(endDate)
  if (diff.days > daysLimit) {
    let errMsg = locale(
      `自定义时间区间不能超过${daysLimit}天`,
      'hint_error_datepopover_custom_date_range_timeout',
      [daysLimit]
    )
    if (onError) {
      onError({
        errMsg: errMsg,
        daysLimit: daysLimit,
        value: value
      })
    } else {
      Toast.show({ content: errMsg, maskClickable: true })
    }
    return false
  }
  return value
}

export default validateDaysLimit
