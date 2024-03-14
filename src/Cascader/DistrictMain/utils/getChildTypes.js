// 获取子级类型
function getChildTypes(type) {
  const types = ['country', 'province', 'city', 'district', 'street']
  let index = types.indexOf(type)
  if (index === -1) return []
  return types.splice(index)
}

export default getChildTypes
