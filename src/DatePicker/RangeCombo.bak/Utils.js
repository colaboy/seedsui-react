import DateComboUtils from './../Combo/Utils'

// eslint-disable-next-line
export default {
  // 显示名称
  getDisplayValue: function ({ ranges, type, format, separator, value }) {
    if (!Array.isArray(value) || value.length !== 2) {
      return ''
    }

    let start = value[0]
    let end = value[1]
    if (!format) {
      format = DateComboUtils.getFormat(type)
    }
    let displayValue = []

    // 显示别名
    if (Object.prototype.toString.call(ranges) === '[object Object]') {
      for (let alias in ranges) {
        let range = ranges[alias]
        if (!Array.isArray(range) || range.length !== 2) {
          continue
        }
        let rangeStart = range[0]
        let rangeEnd = range[1]
        if (
          rangeStart instanceof Date === false ||
          rangeEnd instanceof Date === false ||
          start instanceof Date === false ||
          end instanceof Date === false
        ) {
          continue
        }

        // 时间相同则显示别名
        if (
          start.format(format) === rangeStart.format(format) &&
          end.format(format) === rangeEnd.format(format)
        ) {
          return alias
        }
      }
    }

    // 显示日期
    if (start instanceof Date) {
      displayValue.push(start.format(format))
    } else {
      displayValue.push('')
    }
    if (end instanceof Date) {
      displayValue.push(end.format(format))
    } else {
      displayValue.push('')
    }
    return displayValue.join(separator || '~')
  }
}
