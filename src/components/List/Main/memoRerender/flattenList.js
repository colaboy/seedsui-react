// 获取当前项在列表中的索引
const flattenList = (list) => {
  if (!Array.isArray(list) || !list) return []
  let items = []
  for (let item of list) {
    if (Array.isArray(item.children) && item.children.length) {
      items = items.concat(item.children)
    } else {
      items.push(item)
    }
  }
  return items
}

export default flattenList
