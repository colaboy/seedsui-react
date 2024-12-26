// 根据id, 取出此id的上级节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlattenTreeParent(list, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let parents = []
  for (let i = 0, node; (node = list[i++]); ) {
    // eslint-disable-line
    if (id && node['id'] === id.toString()) {
      parents.push(node)
    }
  }
  return parents
}

export default getFlattenTreeParent
