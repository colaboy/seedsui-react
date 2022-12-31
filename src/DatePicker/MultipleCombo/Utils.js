import DateComboUtils from './../Combo/Utils'

// eslint-disable-next-line
export default {
  // 显示名称
  getDisplayValue: function ({ type, format, value, separator }) {
    if (!Array.isArray(value) || value.length < 2) {
      return ''
    }

    let displayValue = []
    for (let current of value) {
      if (current?.value instanceof Date === false) {
        return ''
      }
      displayValue.push(
        DateComboUtils.getDisplayValue({ type: type, format: format, value: current.value })
      )
    }

    return displayValue.join(separator || ' ~ ')
  }
}
