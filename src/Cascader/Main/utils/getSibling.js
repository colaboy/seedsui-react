// 获取列表
function getSibling({ data, id }) {
  if (!id) {
    return data
  }
  // 获取父节点
  let parent = data.getDeepTreeParent(id)

  if (!parent) {
    return data
  }

  // 获取父节点的所有子节点
  return data.getDeepTreeNode(parent.id)?.children
}

export default getSibling
