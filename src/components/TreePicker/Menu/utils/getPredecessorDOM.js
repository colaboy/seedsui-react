// 获取先辈节点
function getPredecessorDOM({ rootRef, ids, list }) {
  if (!ids || !ids.length) return null
  // 获取所有需要选中展开项
  let nodes = []
  for (let id of ids) {
    nodes = nodes.concat(list.getDeepTreePredecessor(id))
    nodes = nodes.concat({ id: id })
  }

  if (!nodes.length) {
    return null
  }
  // 获取所有dom
  let query = []
  for (let node of nodes) {
    query.push(`[data-id='${node.id}']`)
  }
  query = query.join(',')
  return rootRef.current.querySelectorAll(query)
}

export default getPredecessorDOM
