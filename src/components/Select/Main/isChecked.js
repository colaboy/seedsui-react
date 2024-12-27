// 判断是否选中
function isChecked(item, value) {
  if (!Array.isArray(value)) return false
  for (let option of value) {
    if (option.id === item.id) return true
  }
  return false
}

export default isChecked
