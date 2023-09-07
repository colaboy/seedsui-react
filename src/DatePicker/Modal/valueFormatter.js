// 格式化value, 过滤不合法的值
function formatValue(params) {
  if (params?.value instanceof Date) {
    return params.value
  }
  return null
}

export default formatValue
