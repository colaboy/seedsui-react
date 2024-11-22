// 根据id, 取出此id的后代节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlattenTreeDescendants(list, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let descendants = []
  function buildDescendants(list, id) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (id && item['parentid'] === id.toString()) {
        descendants.push(item)
        buildDescendants(list, item['id'])
      }
    }
  }
  buildDescendants(list, id)
  return descendants
}

export default getFlattenTreeDescendants
