import { getDateDisplayValue } from './../utils'
import getActiveOption from './../RangeMain/getActiveOption'

// 显示名称
function getRangeDisplayValue({ format, ranges, type, value, separator, currentActiveKey }) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  let start = value[0]
  let end = value[1]
  if (Object.isDate(start) === false || Object.isDate(end) === false) {
    return ''
  }

  let displayValue = []

  // 显示别名, 自定义没有别名
  let activeOption = getActiveOption(value, ranges, { format, currentActiveKey })
  if (Array.isArray(activeOption?.value)) {
    return activeOption.name
  }

  // 显示日期
  displayValue.push(getDateDisplayValue({ format: format, type: type, value: start }))
  displayValue.push(getDateDisplayValue({ format: format, type: type, value: end }))
  return displayValue.join(separator || ' ~ ')
}

export default getRangeDisplayValue
