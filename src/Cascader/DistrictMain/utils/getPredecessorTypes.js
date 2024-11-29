// 获取上级类型
function getPredecessorTypes(type) {
  const types = ['country', 'province', 'city', 'district', 'street']
  let index = types.indexOf(type)
  if (index === -1) return []
  return types.splice(0, index + 1)
}

export default getPredecessorTypes
