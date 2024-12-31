// 格式化value, 过滤不合法的值
function formatValue(value) {
  if (!Array.isArray(value) || value.length !== 2) {
    return null
  }
  let startDate = value[0] instanceof Date ? value[0] : null
  let endDate = value[1] instanceof Date ? value[1] : null
  return [startDate, endDate]
}

export default formatValue
