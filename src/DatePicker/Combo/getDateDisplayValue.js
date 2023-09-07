import getFormat from './getFormat'

// 根据日期显示名称
function getDateDisplayValue({ type, value }) {
  let format = getFormat(type)
  // 显示值
  let displayValue = ''
  if (Object.isDate(value)) {
    displayValue = value.format(format)
  }
  return displayValue
}

export default getDateDisplayValue
