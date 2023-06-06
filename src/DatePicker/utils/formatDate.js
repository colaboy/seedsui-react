// 格式化日期
function formatDate(date, type) {
  if (type === 'year') {
    return date.format('YYYY')
  } else if (type === 'quarter') {
    return date.format('YYYY-Q')
  } else if (type === 'month') {
    return date.format('YYYY-MM')
  } else if (type === 'date') {
    return date.format('YYYY-MM-DD')
  } else if (type === 'datetime') {
    return date.format('YYYY-MM-DD hh:mm')
  } else if (type === 'time') {
    return date.format('hh:mm')
  }
}

export default formatDate
