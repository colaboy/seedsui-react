// 判断是否是国
function testCountry(current, isCountry) {
  if (typeof isCountry === 'function') {
    return isCountry(current)
  }
  if (current.isCountry) {
    return true
  }
  for (let country of window.AreaLevel.countries) {
    if (
      current.id === country.id ||
      country.name.indexOf(current.name) !== -1 ||
      current.name.indexOf(country.name) !== -1
    ) {
      return true
    }
  }
  return false
}

export default testCountry
