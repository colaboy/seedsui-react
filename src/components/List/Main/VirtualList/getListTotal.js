// 获取当前项在列表中的索引
const getListTotal = (list) => {
  if (!Array.isArray(list) || !list) return null
  let total = 0
  for (let item of list) {
    if (item.children) {
      total = total + item.children.length
    } else {
      total++
    }
  }
  return total
}

export default getListTotal
