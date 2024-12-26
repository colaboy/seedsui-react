// 根据id, 取出此id的下级节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlattenTreeChildren(list, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let children = []
  for (let i = 0, child; (child = list[i++]); ) {
    // eslint-disable-line
    if (id && child['parentid'] === id.toString()) {
      children.push(child)
    }
  }
  return children
}

export default getFlattenTreeChildren
