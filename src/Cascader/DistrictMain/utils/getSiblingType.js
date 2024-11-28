// 原用于min和editableOptions属性判断, 暂时无用
function getSiblingType(type, step = 1) {
  if (!type || typeof type !== 'string') return null
  const types = ['country', 'province', 'city', 'district', 'street']
  let index = types.indexOf(type)
  if (index === -1) return null
  return types?.[index + step] || null
}

export default getSiblingType
