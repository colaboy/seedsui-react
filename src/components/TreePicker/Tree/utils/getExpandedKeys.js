import getKeywordIds from './getKeywordIds'

// 根据id获取你级的id
function getExpandedKeys(keyword, flattenTree) {
  // 获取所有选中项
  const ids = getKeywordIds(keyword, flattenTree)

  // 获取所有选中项的所有的父级
  let expandedKeys = []
  for (let id of ids) {
    const parentId = flattenTree.getFlattenTreeNode(id).parentid
    const predecessors = flattenTree.getFlattenTreePredecessors(parentId)
    for (let node of predecessors) {
      if (expandedKeys?.indexOf(node.id) === -1) {
        expandedKeys.push(node.id)
      }
    }
  }
  return expandedKeys
}

export default getExpandedKeys
