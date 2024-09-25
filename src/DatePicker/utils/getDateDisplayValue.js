import getFormat from './getFormat'
import DateUtil from './../../DateUtil'

// 根据日期显示名称
function getDateDisplayValue({ format, type, value }) {
  if (!format) {
    // eslint-disable-next-line
    format = getFormat(type)
  }
  // 显示值
  let displayValue = DateUtil.format(value, format)
  return displayValue
}

export default getDateDisplayValue
