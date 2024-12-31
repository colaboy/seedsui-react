// 比较类型
function compareType(type1, type2) {
  const sorts = ['country', 'province', 'city', 'district', 'street']
  let type1Lvl = sorts.indexOf(type1)
  let type2Lvl = sorts.indexOf(type2)
  if (typeof type1Lvl === 'number' && typeof type2Lvl === 'number') {
    if (type1Lvl !== type2Lvl) {
      return type1Lvl > type2Lvl ? 1 : -1
    } else {
      return 0
    }
  }
  return null
}

export default compareType
