// 格式化选中项, 补充parentid
function formatValue(value) {
  if (!Array.isArray(value) || !value.length) return null
  for (let [index, item] of value.entries()) {
    if (index !== 0 && !item.parentid) {
      item.parentid = value?.[index - 1]?.id || ''
    }
  }
  return value
}

export default formatValue
