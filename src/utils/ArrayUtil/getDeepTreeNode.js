// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getDeepTreeNode(tree, id) {
  for (const node of tree) {
    if (node.id === id) {
      return node // 找到目标节点，直接返回
    }
    if (node.children) {
      // 如果有子节点，递归查找
      const result = getDeepTreeNode(node.children, id)
      if (result) return result // 如果找到目标节点，返回结果
    }
  }
  return null // 如果整个树中都没有找到，返回 null
}

export default getDeepTreeNode
