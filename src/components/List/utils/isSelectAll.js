// 判断value是否全选
function isSelectAll(value, list) {
  let ids = Array.isArray(value) ? value.map((item) => item.id) : []
  let checked = true
  for (let item of list) {
    if (!ids.includes(item.id)) {
      checked = false
      break
    }
  }
  return checked
}
export default isSelectAll
