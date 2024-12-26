// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getFlattenTreeNode(id, propertyConfig) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let list = this
  let item = list.filter(function (option) {
    if (option['id'] === id) return true
    return false
  })
  if (item && item.length > 0) {
    item = item[0]
  }
  return item
}

export default getFlattenTreeNode
