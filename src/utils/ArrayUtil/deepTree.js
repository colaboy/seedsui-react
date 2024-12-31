/* -----------------------------------------------------
  树数据深度化, 将树的parentid深度为children, 必须有id和parentid
  @格式 [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
  @return [{id: '', name: '', children: {}}]
 ----------------------------------------------------- */
function deepTree(flattenTree) {
  const idMap = {} // 用对象字面量存储节点映射
  const result = [] // 用于存储最终的层级树

  // 初始化节点映射
  flattenTree.forEach((node) => {
    idMap[node.id] = { ...node }
  })

  // 构建层级树
  flattenTree.forEach((node) => {
    if (node.parentid && idMap[node.parentid]) {
      if (!idMap[node.parentid].children) idMap[node.parentid].children = []
      idMap[node.parentid].children.push(idMap[node.id])
    } else {
      // 如果没有父节点，作为顶级节点
      result.push(idMap[node.id])
    }
  })

  return result
}

export default deepTree
