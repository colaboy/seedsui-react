// 获取当前位置
function getIndex(activeOption, list) {
  if (!activeOption?.id || !Array.isArray(list) || !list.length) return 0
  let activeIndex = list.findIndex((item) => item.id === activeOption.id)
  // 未找到匹配项, 默认选中第一项
  return activeIndex <= 0 ? 0 : activeIndex
}
export default getIndex
