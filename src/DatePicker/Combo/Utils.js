// eslint-disable-next-line
export default {
  // 根据类型获取正确的format
  getFormat: function (type) {
    let format = ''
    switch (type) {
      case 'year':
        format = 'YYYY'
        break
      case 'quarter':
        format = 'YYYY-Q'
        break
      case 'month':
        format = 'YYYY-MM'
        break
      case 'date':
        format = 'YYYY-MM-DD'
        break
      case 'time':
        format = 'hh:mm'
        break
      case 'datetime':
        format = 'YYYY-MM-DD hh:mm'
        break
      default:
        format = 'YYYY-MM-DD'
    }
    return format
  },
  // 显示名称
  getDisplayValue: function ({ type, format, value }) {
    if (!format) {
      format = this.getFormat(type)
    }
    // 显示值
    let displayValue = ''
    if (value instanceof Date) {
      displayValue = value.format(format)
    }
    return displayValue
  }
}
