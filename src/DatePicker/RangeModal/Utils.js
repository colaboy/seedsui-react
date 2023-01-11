import Toast from './../../Toast'
import locale from './../../locale'

// eslint-disable-next-line
export default {
  // ranges分成两部分: quickRanges(快捷选择)和customRanges(自定义选择)
  getRanges: function (ranges) {
    let quickRanges = {}
    let customRanges = {}
    if (toString.call(ranges) === '[object Object]' && !Object.isEmptyObject(ranges)) {
      for (let rangeKey in ranges) {
        let rangeValue = ranges[rangeKey]
        if (
          Array.isArray(rangeValue) &&
          rangeValue.length === 2 &&
          rangeValue[0] instanceof Date &&
          rangeValue[1] instanceof Date
        ) {
          quickRanges[rangeKey] = rangeValue
        } else {
          // 自定义选择只能有一个
          customRanges = {
            [rangeKey]: rangeValue
          }
        }
      }
    } else {
      if (typeof ranges === 'number') {
        customRanges = {
          [locale('自定义时间', 'datepicker-tooltip_custom_date')]: ranges
        }
      }
    }
    return {
      quickRanges: quickRanges,
      customRanges: customRanges
    }
  },
  // 开始结束时间
  getDates: function (value) {
    if (
      !Array.isArray(value) ||
      value.length !== 2 ||
      value[0] instanceof Date === false ||
      value[1] instanceof Date === false
    ) {
      console.warn(
        'DatePicker.RangeModal: Wrong parameter with "value"! You need to correct for [new Date(), new Date()]',
        value
      )
      return {
        startDate: null,
        endDate: null
      }
    }
    let startDate = value[0] instanceof Date ? value[0] : null
    let endDate = value[1] instanceof Date ? value[1] : null
    return {
      startDate: startDate,
      endDate: endDate
    }
  },
  // 判断是否开始时间大于结束时间
  validateTime: function (value, config) {
    let { startDate, endDate } = this.getDates(value)
    if (!startDate || !endDate) {
      return true
    }
    const { type, onError } = config
    let errMsg = ''
    if (type === 'year' && endDate.compareYear(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    } else if (type === 'quarter' && endDate.compareMonth(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    } else if (type === 'month' && endDate.compareMonth(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    } else if (type === 'date' && endDate.compareDate(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    } else if (type === 'datetime' && endDate.compareDateTime(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    } else if (type === 'time' && endDate.compareTime(startDate) === -1) {
      errMsg = locale('开始时间不能大于结束时间', 'hint_start_greater_end_time')
    }

    // 有错误
    if (errMsg) {
      if (onError) {
        onError({
          errMsg: errMsg,
          value: value
        })
      } else {
        Toast.show({ content: errMsg })
      }
      return false
    }
    return true
  },
  // 计算区间, 区间内
  validateDays: function (value, { daysLimit, onError }) {
    if (!daysLimit) return true
    let { startDate, endDate } = this.getDates(value)
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
}
