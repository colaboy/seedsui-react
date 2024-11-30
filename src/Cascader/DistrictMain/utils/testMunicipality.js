// 判断是否是直辖市
function testMunicipality(current, isMunicipality) {
  if (typeof isMunicipality === 'function') {
    return isMunicipality(current)
  }
  if (current.isMunicipality || current.type?.includes?.('municipality')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.cityIds || []).includes(current.id)
}

export default testMunicipality
