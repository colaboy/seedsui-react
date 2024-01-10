// 判断是否在data中，在data中被认为是省市区，不在则是街道
function testNodeData(current, data) {
  if (!current.id || !data?.length) return false

  return data.getDeepTreeNode(current.id) ? true : false
}

export default testNodeData
