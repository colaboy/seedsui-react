// 将服务器数据转成本地数据
function localData(list) {
  // Create a Map to group items by anchor
  const groupMap = new Map()

  // Iterate through the list and group by anchor
  list.forEach((item) => {
    if (!groupMap.has(item.anchor)) {
      groupMap.set(item.anchor, [])
    }
    groupMap.get(item.anchor).push(item)
  })

  // Convert Map to array of objects in required format
  const result = Array.from(groupMap.entries()).map(([anchor, children]) => ({
    id: anchor,
    anchor: anchor,
    name: anchor,
    children: children
  }))

  return result
}
export default localData
