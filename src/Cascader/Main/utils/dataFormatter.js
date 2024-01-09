// 格式化数据
function dataFormatter(list) {
  if (!Array.isArray(list) || !list.length) return []
  return list.setDeepTreeParentId()
}

export default dataFormatter
