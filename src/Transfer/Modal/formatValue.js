// 格式化value, 过滤不合法的值
function formatValue(value) {
  if (Array.isArray(value)) {
    return value
  }
  return []
}

export default formatValue
