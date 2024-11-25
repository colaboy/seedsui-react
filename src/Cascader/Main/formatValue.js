// 格式化选中项
function formatValue(value) {
  if (Array.isArray(value) && value.length) {
    for (let [index, item] of value.entries()) {
      if (index !== 0 && !item.parentid) {
        item.parentid = value?.[index - 1]?.id || ''
      }
    }
  }
  return value
}

export default formatValue
