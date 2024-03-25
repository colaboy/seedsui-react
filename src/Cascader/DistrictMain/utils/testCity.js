// 判断是否是市
function testCity(current, isCity) {
  if (typeof isCity === 'function') {
    return isCity(current)
  }
  if (current.isCity) {
    return true
  }
  for (let city of window?.AreaLevel?.cities || []) {
    if (
      current.id === city.id ||
      city.name?.indexOf(current.name) !== -1 ||
      current.name?.indexOf(city.name) !== -1
    ) {
      return true
    }
  }
  return false
}

export default testCity
