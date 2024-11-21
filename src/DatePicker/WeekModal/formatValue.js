// 格式化value, 过滤不合法的值
function formatValue(value) {
  if (value instanceof Date) {
    return value
  }
  return null
}

export default formatValue
