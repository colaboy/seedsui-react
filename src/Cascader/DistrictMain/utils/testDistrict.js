// 判断是否是区
function testDistrict(current, isDistrict) {
  if (typeof isDistrict === 'function') {
    return isDistrict(current)
  }
  if (current.isDistrict) {
    return true
  }
  for (let district of window?.districtLevelData?.districts || []) {
    if (current.id === district.id) {
      return true
    }
    if (
      current.name &&
      (district.name?.indexOf(current.name) !== -1 || current.name?.indexOf(district.name) !== -1)
    ) {
      return true
    }
  }
  return false
}

export default testDistrict
