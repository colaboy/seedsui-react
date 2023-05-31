import { getActiveKey, getDateDisplayValue } from './../utils'

// 显示名称
function getRangeDisplayValue({ ranges, type, format, value, separator }) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  let start = value[0]
  let end = value[1]
  if (Object.isDate(start) === false || Object.isDate(end) === false) {
    return ''
  }

  let displayValue = []

  // 显示别名
  let activeKey = getActiveKey(value, ranges, { format: format })
  if (activeKey) {
    return activeKey
  }

  // 显示日期
  displayValue.push(getDateDisplayValue({ type: type, format: format, value: start }))
  displayValue.push(getDateDisplayValue({ type: type, format: format, value: end }))
  return displayValue.join(separator || ' ~ ')
}

export default getRangeDisplayValue
