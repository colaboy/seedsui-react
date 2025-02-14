// 值转换为active
function valueToActive(value) {
  let active = {}
  if (Array.isArray(value) && value.length) {
    for (let item of value) {
      active[item.id] = item
    }
  }
  return active
}
export default valueToActive
