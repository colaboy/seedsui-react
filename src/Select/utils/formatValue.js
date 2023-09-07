// 格式化value, 过滤不合法的值
function formatValue(params) {
  if (Array.isArray(params?.value)) {
    return params.value
  }
  return []
}

export default formatValue
