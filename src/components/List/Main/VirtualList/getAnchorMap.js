// 获取锚点索引
function getAnchorMap(list) {
  const anchorMap = {}
  let currentIndex = 0

  for (let group of list) {
    if (!group.anchor) continue
    // 记录当前分组的起始索引（标题位置）
    anchorMap[group.anchor] = currentIndex
    // 计算下一个分组的起始索引：当前索引 + 当前标题(1) + 子项数量
    currentIndex += 1 + (group.children?.length || 0)
  }

  return anchorMap
}

export default getAnchorMap
