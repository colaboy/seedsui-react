// 获取当前位置
function getIndex(value, list) {
  if (!Array.isArray(value) || !value.length || !Array.isArray(list) || !list.length) return 0
  let activeOption = value[0]
  return list.findIndex((item) => item.id === activeOption.id) || 0
}
export default getIndex
