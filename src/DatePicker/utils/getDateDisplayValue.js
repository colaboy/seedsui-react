import getFormat from './getFormat'
import formatDate from './formatDate'

// 根据日期显示名称
function getDateDisplayValue({ format, type, value }) {
  if (!format) {
    // eslint-disable-next-line
    format = getFormat(type)
  }
  // 显示值
  let displayValue = formatDate(value, format)
  return displayValue
}

export default getDateDisplayValue
