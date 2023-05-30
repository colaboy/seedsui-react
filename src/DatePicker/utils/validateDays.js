import Toast from './../../Toast'
import locale from './../../locale'
import getDates from './getDates'

// 计算区间, 区间内
function validateDays(value, { daysLimit, onError }) {
  if (!daysLimit) return true
  let { startDate, endDate } = getDates(value)
  if (!startDate || !endDate) {
    return true
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
      Toast.show({ content: errMsg })
    }
    return false
  }
  return true
}

export default validateDays
