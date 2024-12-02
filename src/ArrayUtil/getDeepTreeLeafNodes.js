// 获取末级节点
function getDeepTreeLeafNodes(tree) {
  const leafNodes = [] // 用于存储末级节点

  function traverse(nodes) {
    for (const node of nodes) {
      if (Array.isArray(node.children) && node.children.length > 0) {
        // 如果有子节点，递归处理子节点
        traverse(node.children)
      } else {
        // 如果没有子节点，说明是末级节点
        leafNodes.push(node)
      }
    }
  }

  traverse(tree) // 从根节点开始遍历
  return leafNodes // 返回所有的末级节点
}

export default getDeepTreeLeafNodes
