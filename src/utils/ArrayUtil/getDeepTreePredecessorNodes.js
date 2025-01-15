// 取出所有先辈节点
function getDeepTreePredecessorNodes(tree, id) {
  const predecessorNodes = [] // 用于存储先辈节点

  // 辅助函数：递归遍历查找目标节点的路径
  function traverse(nodes, targetId) {
    for (const node of nodes) {
      if (node.id === targetId) {
        // 找到目标节点，返回 true
        return true
      }
      if (node.children && node.children.length > 0) {
        // 递归遍历子节点
        if (traverse(node.children, targetId)) {
          // 如果子节点路径中包含目标节点，则将当前节点加入结果
          predecessorNodes.unshift(node)
          return true
        }
      }
    }
    return false // 未找到目标节点
  }

  traverse(tree, id) // 开始递归查找
  return predecessorNodes // 返回所有先辈节点
}

export default getDeepTreePredecessorNodes
