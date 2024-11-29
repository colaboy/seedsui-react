function getDeepTreeNodes(tree, filter) {
  const result = []

  function traverse(nodes) {
    for (const node of nodes) {
      // 如果当前节点满足过滤条件，加入结果列表
      if (filter(node)) {
        result.push(node)
      }
      // 如果有子节点，递归遍历子节点
      if (node.children && Array.isArray(node.children)) {
        traverse(node.children)
      }
    }
  }

  traverse(tree)
  return result
}

export default getDeepTreeNodes
