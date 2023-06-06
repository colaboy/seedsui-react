import locale from './../../locale'

// 日期纠正
function validateDate(value, config = {}) {
  const type = config.type
  const min = config.min
  const max = config.max
  const onError = config.onError

  if (Object.isDate(value) === false) {
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
      value = max
    }
  }
  return value
}

export default validateDate
