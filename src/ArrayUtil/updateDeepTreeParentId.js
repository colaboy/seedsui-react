// 补充parentid
function updateDeepTreeParentId(tree, parentid = null) {
  for (const node of tree) {
    // 为当前节点补充 parentid
    node.parentid = parentid

    // 如果存在子节点，递归处理子节点
    if (node.children && Array.isArray(node.children)) {
      updateDeepTreeParentId(node.children, node.id)
    }
  }
  return tree
}

export default updateDeepTreeParentId
