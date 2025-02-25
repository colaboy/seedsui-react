// 获取当前项在列表中的索引
const getItemIndex = (groupCounts, groupIndex, index) => {
  let total = 0
  for (let i = 0; i < groupIndex; i++) {
    total += groupCounts[i]
  }
  return total + index
}

export default getItemIndex
