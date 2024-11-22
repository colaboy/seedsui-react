// 根据id, 取出此id节点的父级数据
function getDeepTreeParent(id) {
  // eslint-disable-next-line
  if (typeof id === 'number') id = String(id)

  let current = getDeepTreeNode(list, id)
  if (current && current['parentid']) {
    current = getDeepTreeNode(list, current['parentid'])
  } else {
    current = null
  }
  return current
}

export default getDeepTreeParent
