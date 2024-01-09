// 获取列表
function getChildren({ data, id }) {
  return data.getDeepTreeNode(id)?.children
}

export default getChildren
