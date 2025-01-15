import getFlatTreeNode from './getFlatTreeNode'

// 根据id, 取出此id的父级节点
function getFlatTreeParentNode(tree, id) {
  let parentId = getFlatTreeNode(tree, id)?.parentid
  if (parentId) {
    return getFlatTreeNode(tree, parentId)
  }

  return null
}

export default getFlatTreeParentNode
