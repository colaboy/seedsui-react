import getDateDisplayValue from './../Combo/getDateDisplayValue'

// 显示多选名称
function getMultipleDisplayValue({ type, value, separator }) {
  if (!Array.isArray(value) || value.length < 2) {
    return ''
  }

  let displayValue = []
  for (let current of value) {
    if (Object.isDate(current?.value) === false) {
      return ''
    }
    displayValue.push(getDateDisplayValue({ type: type, value: current.value }))
  }

  return displayValue.join(separator || ' ~ ')
}

export default getMultipleDisplayValue
