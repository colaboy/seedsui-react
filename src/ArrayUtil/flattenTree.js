function _buildTreeToFlatten(list) {
  // 扁平化, 将children拉平
  let tree = []
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (let c = 0; c < item.children.length; c++) {
        item.children[c]['parentid'] = item['id']
      }
      temp = item.children.concat(temp)
    } else {
      item.isLeaf = true
    }
    // 删除此项children
    delete item.children
    // 添加此项到tree
    tree.push(item)
  }
  return tree
}

function flattenTree(list) {
  if (!Array.isArray(list) || !list.length) return list
  return _buildTreeToFlatten(list, 'parentid', 'id')
}

export default flattenTree
