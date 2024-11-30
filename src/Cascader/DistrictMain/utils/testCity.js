// 判断是否是市
function testCity(current, isCity) {
  if (typeof isCity === 'function') {
    return isCity(current)
  }
  if (current.isCity || current.type?.includes?.('city')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.cityIds || []).includes(current.id)
}

export default testCity
