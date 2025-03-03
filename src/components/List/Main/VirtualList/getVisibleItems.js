// 缓冲区大小
const buffer = 80

// 计算可见区域元素
function getVisibleItems({ prependHeight, items, itemHeights, scrollTop, containerHeight }) {
  // 计算每一项的 top 值和高度
  let top = 0
  for (let [index, item] of items.entries()) {
    let itemHeight = itemHeights[index]
    top = index === 0 ? 0 : items[index - 1].virtualData.top + items[index - 1].virtualData.height
    item.virtualData = {
      type: item.virtualData?.type || undefined,
      height: itemHeight,
      top: top,
      index: index
    }
  }

  // 计算可见区域的起始索引
  let startIndex = 0
  try {
    while (items[startIndex].virtualData.top < scrollTop - prependHeight - buffer) {
      startIndex++
    }
  } catch (error) {
    console.error('List.VirtualList calculate startIndex error: ', error)
  }

  // 计算可见区域的结束索引
  let endIndex = startIndex
  while (endIndex < items.length && items[endIndex].virtualData.top < scrollTop + containerHeight) {
    endIndex++
  }

  // 渲染可见区域的元素
  const visibleItems = items.slice(startIndex, endIndex)

  return visibleItems
}

export default getVisibleItems
