// 判断是否是区
function testDistrict(current, isDistrict) {
  if (typeof isDistrict === 'function') {
    return isDistrict(current)
  }
  if (current.isDistrict || current.type?.includes?.('district')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.districtIds || []).includes(current.id)
}

export default testDistrict
