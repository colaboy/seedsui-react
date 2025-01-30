// 格式化选中项, 补充parentid
function formatValue(value) {
  if (!Array.isArray(value) || !value.length) return null
  for (let [index, item] of value.entries()) {
    // id和parentid必须为string
    if (item.id && typeof item.id === 'number') {
      item.id = String(item.id)
    }
    if (item.parentid && typeof item.parentid === 'number') {
      item.parentid = String(item.parentid)
    }
    if (index !== 0 && !item.parentid) {
      item.parentid = value?.[index - 1]?.id || ''
    }
  }
  return value
}

export default formatValue
