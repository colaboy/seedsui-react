function getVisibleItems({ items, itemHeights, scrollTop, containerHeight }) {
  // 计算每一项的 top 值和高度
  for (let [index, item] of items.entries()) {
    let itemHeight = itemHeights[index]
    item.virtualData = {
      type: item.virtualData?.type || undefined,
      height: itemHeight,
      top: itemHeight * index,
      index: index
    }
  }

  // 计算可见区域的起始索引
  let startIndex = 0
  while (items[startIndex].virtualData.top < scrollTop) {
    startIndex++
  }

  // 计算可见区域的结束索引
  let endIndex = startIndex
  while (
    endIndex < items.length &&
    items[startIndex].virtualData.top < scrollTop + containerHeight
  ) {
    endIndex++
  }

  // 渲染可见区域的元素
  const visibleItems = items.slice(startIndex, endIndex)

  return visibleItems
}

export default getVisibleItems
