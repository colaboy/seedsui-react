// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getFlattenTreeNode(tree, id) {
  for (const node of tree) {
    if (node.id === id) {
      return node // 找到目标节点，直接返回
    }
  }
  return null // 如果整个树中都没有找到，返回 null
}

export default getFlattenTreeNode
