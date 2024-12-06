// Recurse tree, set node
function setDeepTreeNodes(tree, updateNode) {
  for (const node of tree) {
    updateNode && updateNode(node)
    if (Array.isArray(node.children) && node.children.length) {
      // 递归查找子节点
      setDeepTreeNode(node.children, id, updateNode)
    }
  }
  return tree
}

export default setDeepTreeNodes
