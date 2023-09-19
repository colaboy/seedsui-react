// 获取最小类型
function getMinTypes(type) {
  const types = ['country', 'province', 'city', 'district', 'street']
  let index = types.indexOf(type)
  if (index === -1) return []
  return types.splice(index)
}

export default getMinTypes
