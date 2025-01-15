// 根据id, 取出此id的后代节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlatTreeDescendantNodes(tree, id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let descendants = []
  function buildDescendants(tree, id) {
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i]
      if (id && item['parentid'] === id.toString()) {
        descendants.push(item)
        buildDescendants(tree, item['id'])
      }
    }
  }
  buildDescendants(tree, id)
  return descendants
}

export default getFlatTreeDescendantNodes
