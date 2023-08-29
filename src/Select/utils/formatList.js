// 格式化list, 过滤不合法的值
function formatList(list) {
  if (!Array.isArray(list)) {
    console.error('Picker.Modal: Wrong parameter with "list"! You need pass a Array')
    return []
  }
  return list.filter((item) => {
    if (!item || (!item.id && !item.name)) return false
    return true
  })
}

export default formatList
