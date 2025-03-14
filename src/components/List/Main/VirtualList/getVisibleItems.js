import constant from './constant'

// 计算可见区域元素
function getVisibleItems({ prependHeight, items, itemHeights, scrollTop, containerHeight }) {
  if (!Array.isArray(items) || !items.length) return []
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
  while (
    items[startIndex] &&
    items[startIndex].virtualData.top < scrollTop - prependHeight - constant.buffer
  ) {
    startIndex++
  }

  // 计算可见区域的结束索引
  let endIndex = startIndex
  while (items[endIndex] && items[endIndex].virtualData.top < scrollTop + containerHeight) {
    endIndex++
  }

  // 渲染可见区域的元素
  const visibleItems = items.slice(startIndex, endIndex)

  return visibleItems
}

export default getVisibleItems
