import locale from './../../locale'
import DateComboUtils from './../Combo/Utils'

// eslint-disable-next-line
export default {
  // value不存在时默认为当天
  getValue: function ({ value }) {
    if (!value) {
      value = [
        {
          type: 'date',
          id: 'start',
          name: locale('开始时间', 'start_time'),
          value: new Date()
        },
        {
          type: 'date',
          id: 'end',
          name: locale('结束时间', 'end_time'),
          value: new Date()
        }
      ]
    }
    return value
  },
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
