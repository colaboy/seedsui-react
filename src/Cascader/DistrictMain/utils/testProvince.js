// 判断是否是省
function testProvince(current, isProvince) {
  if (typeof isProvince === 'function') {
    return isProvince(current)
  }
  if (current.isProvince) {
    return true
  }
  for (let province of window?.districtLevelData?.provinces || []) {
    if (current.id === province.id) {
      return true
    }
    if (
      current.name &&
      (province.name?.indexOf(current.name) !== -1 || current.name?.indexOf(province.name) !== -1)
    ) {
      return true
    }
  }
  return false
}

export default testProvince
