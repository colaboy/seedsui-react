import DateUtil from './../../DateUtil'

// 显示名称
function getRangeDisplayValue({ format, value }) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  let start = value[0]
  let end = value[1]
  if (start instanceof Date === false || end instanceof Date === false) {
    return ''
  }

  return DateUtil.formatDate(start, typeof format === 'string' ? format : 'YYYY-ddd')
}

export default getRangeDisplayValue
