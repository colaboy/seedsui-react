// 判断是否是国
function testCountry(current, isCountry) {
  if (typeof isCountry === 'function') {
    return isCountry(current)
  }
  if (current.isCountry || current.type?.includes?.('country')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.countryIds || []).includes(current.id)
}

export default testCountry
