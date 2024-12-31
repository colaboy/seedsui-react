// 判断是否是街道
function testStreet(current, isStreet) {
  if (typeof isStreet === 'function') {
    return isStreet(current)
  }
  if (current.isStreet || current.type?.includes?.('street')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.streetIds || []).includes(current.id)
}

export default testStreet
