// 更新末级节点
function setDeepTreeLeafNode(tree, updateNode) {
  for (const node of tree) {
    if (Array.isArray(node.children) && node.children.length) {
      // 递归查找子节点
      setDeepTreeLeafNode(node.children, updateNode)
    } else {
      updateNode && updateNode(node)
    }
  }
  return tree
}

export default setDeepTreeLeafNode
