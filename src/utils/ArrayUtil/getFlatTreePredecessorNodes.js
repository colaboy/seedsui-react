function getFlatTreePredecessorNodes(tree, id) {
  const result = []

  // 构建一个 id -> 节点 的映射
  const nodeMap = {}
  tree.forEach((node) => {
    nodeMap[node.id] = node
  })

  let currentNode = nodeMap[id]
  while (currentNode && currentNode.parentid) {
    const parentNode = nodeMap[currentNode.parentid]
    if (parentNode) {
      result.unshift(parentNode) // 确保父节点顺序从根到当前节点
      currentNode = parentNode
    } else {
      break
    }
  }

  return result
}

export default getFlatTreePredecessorNodes
