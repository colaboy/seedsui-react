// 根据id, 取出此id的前代节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlattenTreePredecessors(list, parentId) {
  // eslint-disable-next-line
  if (typeof parentId === 'number') parentId = String(parentId)

  let predecessors = []
  function buildParent(list, parentId) {
    for (let i = 0, node; (node = list[i++]); ) {
      // eslint-disable-line
      if (parentId && node['id'] === parentId.toString()) {
        predecessors.push(node)
        buildParent(list, node['parentid'])
      }
    }
  }
  buildParent(list, parentId)
  return predecessors
}

export default getFlattenTreePredecessors
