// 根据id, 取出此id节点的数据, 即[{id: '', name: '', parentid: ''}]
function getFlattenTreeNodes(tree, filter) {
  const result = []
  for (const node of tree) {
    // 如果当前节点满足过滤条件，加入结果列表
    if (filter(node)) {
      result.push(node)
    }
  }
  return result
}

export default getFlattenTreeNodes
