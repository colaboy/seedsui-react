// 判断是否是街道
function testStreet(current, isStreet) {
  if (typeof isStreet === 'function') {
    return isStreet(current)
  }
  if (current.isStreet) {
    return true
  }
  return false
}

export default testStreet
