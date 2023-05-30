import getDateDisplayValue from './getDateDisplayValue'

// 显示多选名称
function getMultipleDisplayValue({ type, format, value, separator }) {
  if (!Array.isArray(value) || value.length < 2) {
    return ''
  }

  let displayValue = []
  for (let current of value) {
    if (current?.value instanceof Date === false) {
      return ''
    }
    displayValue.push(getDateDisplayValue({ type: type, format: format, value: current.value }))
  }

  return displayValue.join(separator || ' ~ ')
}

export default getMultipleDisplayValue
