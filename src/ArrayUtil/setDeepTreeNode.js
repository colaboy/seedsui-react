// 根据id, 在指定id节点下加入属性数据, 例如{children: [{id: '', name: '', parentid: ''}]}
function setDeepTreeNode(tree, id, updateNode) {
  for (const node of tree) {
    if (node.id === id) {
      // 找到目标节点，调用 updateNode 方法更新其属性
      updateNode(node)
      break
    }
    if (Array.isArray(node.children) && node.children.length) {
      // 递归查找子节点
      setDeepTreeNode(node.children, id, updateNode)
    }
  }
  return tree
}

export default setDeepTreeNode
