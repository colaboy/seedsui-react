// 内库使用
import DateUtil from './../../DateUtil'

// 显示多选名称
function getMultipleDisplayValue({ type, value, separator }) {
  if (!Array.isArray(value) || value.length < 2) {
    return ''
  }

  let displayValue = []
  for (let current of value) {
    if (current?.value instanceof Date === false) {
      return ''
    }
    displayValue.push(DateUtil.format(current.value, type))
  }

  return displayValue.join(separator || ' ~ ')
}

export default getMultipleDisplayValue
