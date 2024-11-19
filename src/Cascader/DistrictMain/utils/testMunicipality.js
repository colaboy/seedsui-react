// 判断是否是直辖市
function testMunicipality(current, isMunicipality) {
  if (typeof isMunicipality === 'function') {
    return isMunicipality(current)
  }
  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (
    ['110000', '120000', '310000', '500000', '710000', '820000', '810000'].indexOf(current.id) !==
    -1
  )
}

export default testMunicipality
