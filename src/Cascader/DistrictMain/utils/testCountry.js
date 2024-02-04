// 判断是否是国
function testCountry(current, isCountry) {
  if (typeof isCountry === 'function') {
    return isCountry(current)
  }
  if (current.isCountry) {
    return true
  }

  for (let country of window?.AreaLevel?.countries || []) {
    if (current.id === country.id) {
      return true
    }
  }
  return false
}

export default testCountry
