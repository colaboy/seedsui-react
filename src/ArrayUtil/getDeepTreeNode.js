// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getDeepTreeNode(id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let list = Object.clone(this)
  let temp = [] // 用于存储children
  // 先将第一层节点放入temp
  for (let i = 0; i < list.length; i++) {
    temp.push(list[i])
  }
  while (temp.length) {
    // 取出一项, 并移除此项
    let item = temp.shift()
    if (item['id'] === id) return item
    // 此项children合并到temp
    if (item.children && item.children.length) {
      // 添加parentid
      for (let c = 0; c < item.children.length; c++) {
        item.children[c]['parentid'] = item['id']
      }
      temp = item.children.concat(temp)
    }
    // 删除此项children
    delete item.children
  }
  return null
}

export default getDeepTreeNode
