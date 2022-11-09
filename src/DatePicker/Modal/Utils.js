import locale from './../../locale'

// eslint-disable-next-line
export default {
  // 获取默认值, 用于实例化日期
  getDefaults: function (value) {
    var defaultValue = value
    if (defaultValue instanceof Date === false) {
      defaultValue = new Date()
    }

    var defaultDay = defaultValue.getDate()
    defaultDay = defaultDay < 10 ? '0' + defaultDay : defaultDay

    var defaultHour = defaultValue.getHours()
    defaultHour = defaultHour < 10 ? '0' + defaultHour : defaultHour

    var defaultMinute = defaultValue.getMinutes()
    defaultMinute = defaultMinute < 10 ? '0' + defaultMinute : defaultMinute

    return {
      year: defaultValue.getFullYear(),
      quarter: defaultValue.quarter(),
      month: defaultValue.month(),
      day: defaultDay,
      hour: defaultHour,
      minute: defaultMinute
    }
  },
  // 数据
  getData: function (data) {
    // 自定义数据
    var yearsData = null
    var quartersData = null
    var monthsData = null
    var daysData = null
    var hoursData = null
    var minutesData = null
    if (data) {
      if (data.year) {
        yearsData = data.year.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_year') // 年
          }
        })
      }
      if (data.quarter) {
        quartersData = data.quarter.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_quarter') // 季
          }
        })
      }
      if (data.month) {
        monthsData = data.month.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_month') // 月
          }
        })
      }
      if (data.day) {
        daysData = data.day.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_date') // 日
          }
        })
      }
      if (data.hour) {
        hoursData = data.hour.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_hour') // 时
          }
        })
      }
      if (data.minute) {
        minutesData = data.minute.map((n) => {
          return {
            id: '' + n,
            name: '' + n + locale('', 'picker_unit_minute') // 分
          }
        })
      }
    }
    return {
      yearsData: yearsData,
      quartersData: quartersData,
      monthsData: monthsData,
      daysData: daysData,
      hoursData: hoursData,
      minutesData: minutesData
    }
  },
  // 格式化日期
  formatDate: function (date, type) {
    if (type === 'year') {
      return date.format('YYYY')
    } else if (type === 'quarter') {
      return date.format('YYYY-Q')
    } else if (type === 'month') {
      return date.format('YYYY-MM')
    } else if (type === 'date') {
      return date.format('YYYY-MM-DD')
    } else if (type === 'datetime') {
      return date.format('YYYY-MM-DD hh:mm')
    } else if (type === 'time') {
      return date.format('hh:mm')
    }
  },
  // 日期纠正
  validateDate: function (value, config = {}) {
    const type = config.type
    const min = config.min
    const max = config.max
    const onError = config.onError

    if (value instanceof Date === false) {
      console.log('DatePicker.Modal-Utils.validateDate:非法的value')
      return null
    }

    if (min) {
      if (type === 'year' && value.compareYear(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'quarter' && value.compareMonth(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'month' && value.compareMonth(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'date' && value.compareDate(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'datetime' && value.compareDateTime(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'time' && value.compareTime(min) === -1) {
        if (onError) {
          onError({
            errMsg: locale('不能小于', 'hint_cannot_be_less_than') + this.formatDate(min, type),
            min: min,
            value: value
          })
          return false
        }
        value = min
      }
    }
    if (max) {
      if (type === 'year' && value.compareYear(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'quarter' && value.compareMonth(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'month' && value.compareMonth(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'date' && value.compareDate(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'time' && value.compareTime(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'datetime' && value.compareDateTime(max) === 1) {
        if (onError) {
          onError({
            errMsg: locale('不能大于', 'hint_cannot_be_greater_than') + this.formatDate(max, type),
            max: max,
            value: value
          })
          return false
        }
        value = max
      }
    }
    return value
  }
}
