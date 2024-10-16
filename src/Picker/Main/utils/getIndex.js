// 获取当前位置
function getIndex(activeOption, list) {
  if (!activeOption?.id || !Array.isArray(list) || !list.length) return 0
  return list.findIndex((item) => item.id === activeOption.id) || 0
}
export default getIndex
