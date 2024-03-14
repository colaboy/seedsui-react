// 判断是否在data中，在data中被认为是省市区，不在则是街道
function testNodeData(current, data) {
  if (!current?.id || !Array.isArray(data) || !data?.length) return false

  let node = data.getDeepTreeNode(current.id)
  if (node?.isStreet) return 'street'
  if (node) return true
  return false
}

export default testNodeData
