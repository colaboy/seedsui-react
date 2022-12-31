import DateComboUtils from './../Combo/Utils'

// eslint-disable-next-line
export default {
  // 显示名称
  getDisplayValue: function ({ ranges, type, format, value, separator }) {
    if (!Array.isArray(value) || value.length !== 2) {
      return ''
    }

    let start = value[0]
    let end = value[1]
    if (start instanceof Date === false || end instanceof Date === false) {
      return ''
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
        if (rangeStart instanceof Date === false || rangeEnd instanceof Date === false) {
          continue
        }

        // 区间相同则显示别名
        if (
          DateComboUtils.getDisplayValue({ type: type, format: format, value: start }) ===
            DateComboUtils.getDisplayValue({ type: type, format: format, value: rangeStart }) &&
          DateComboUtils.getDisplayValue({ type: type, format: format, value: end }) ===
            DateComboUtils.getDisplayValue({ type: type, format: format, value: rangeEnd })
        ) {
          return alias
        }
      }
    }

    // 显示日期
    displayValue.push(DateComboUtils.getDisplayValue({ type: type, format: format, value: start }))
    displayValue.push(DateComboUtils.getDisplayValue({ type: type, format: format, value: end }))
    return displayValue.join(separator || ' ~ ')
  }
}
