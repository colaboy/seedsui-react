// 判断是否是区
function testDistrict(current, isDistrict) {
  if (typeof isDistrict === 'function') {
    return isDistrict(current)
  }
  if (current.isDistrict) {
    return true
  }
  return false
}

export default testDistrict
