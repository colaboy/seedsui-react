import locale from './../../utils/locale'

// eslint-disable-next-line
export default {
  // 日期纠正
  validateDate: function (val, config = {}) {
    const type = config.type
    const min = config.min
    const max = config.max
    const split = config.split || '-'
    const timeSplit = config.timeSplit || ':'
    const onError = config.onError
    let value = val
    const selectDate = value.toDate(split, timeSplit)
    const e = config.event || {}
    if (
      min &&
      (min.isYear(split) ||
        min.isQuarter(split) ||
        min.isMonth(split) ||
        min.isDate(split) ||
        min.isDateTime(split, timeSplit) ||
        min.isTime(timeSplit))
    ) {
      if (type === 'year' && selectDate.compareYear(min.toDate(split, timeSplit)) === -1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (
        type === 'quarter' &&
        selectDate.compareMonth(min.toDate(split, timeSplit)) === -1
      ) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'month' && selectDate.compareMonth(min.toDate(split, timeSplit)) === -1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'date' && selectDate.compareDate(min.toDate(split, timeSplit)) === -1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (
        type === 'datetime' &&
        selectDate.compareDateTime(min.toDate(split, timeSplit)) === -1
      ) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      } else if (type === 'time' && selectDate.compareTime(min.toDate(split, timeSplit)) === -1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + min,
            select: value,
            min: min,
            value: value
          })
          return false
        }
        value = min
      }
    }
    if (
      max &&
      (max.isYear(split) ||
        max.isMonth(split) ||
        max.isQuarter(split) ||
        max.isDateTime(split, timeSplit) ||
        max.isDate(split) ||
        max.isTime(timeSplit))
    ) {
      if (type === 'year' && selectDate.compareYear(max.toDate(split, timeSplit)) === 1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (
        type === 'quarter' &&
        selectDate.compareMonth(max.toDate(split, timeSplit)) === 1
      ) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'month' && selectDate.compareMonth(max.toDate(split, timeSplit)) === 1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'date' && selectDate.compareDate(max.toDate(split, timeSplit)) === 1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (type === 'time' && selectDate.compareTime(max.toDate(split, timeSplit)) === 1) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
            max: max,
            value: value
          })
          return false
        }
        value = max
      } else if (
        type === 'datetime' &&
        selectDate.compareDateTime(max.toDate(split, timeSplit)) === 1
      ) {
        if (onError) {
          onError(e, {
            errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + max,
            select: value,
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
