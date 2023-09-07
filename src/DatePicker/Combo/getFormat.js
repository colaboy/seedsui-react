// 根据类型获取正确的format
function getFormat(type) {
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
}

export default getFormat
