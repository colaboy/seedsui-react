import locale from './../../locale'
// 测试使用
// import locale from 'seedsui-react/lib/locale'
import DateUtil from './../../DateUtil'

// 日期纠正
function validateMaxMin(value, config = {}) {
  const type = config.type
  const min = config.min
  const max = config.max
  const onError = config.onError

  if (Object.isDate(value) === false) {
    console.log('DatePicker.Modal-Utils.validateMaxMin:非法的value')
    return null
  }

  if (min) {
    if (type === 'year' && value.compareYear(min) === -1) {
      if (onError) {
        onError({
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能小于', 'SeedsUI_cannot_less_than') + DateUtil.format(min, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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
          errMsg: locale('不能大于', 'SeedsUI_cannot_greater_than') + DateUtil.format(max, type),
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

export default validateMaxMin
