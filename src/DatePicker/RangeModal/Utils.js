import Toast from './../../Toast'
import locale from './../../locale'

// eslint-disable-next-line
export default {
  // 计算区间, 区间内
  validateRange: function (value, config) {
    const daysLimit = config.daysLimit
    const onError = config.onError
    if (!daysLimit) return true
    if (!Array.isArray(value) || value.length !== 2) return true
    let startDate = value[0] instanceof Date ? value[0] : null
    let endDate = value[1] instanceof Date ? value[1] : null
    if (startDate && endDate) {
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
    }
    return true
  }
}
