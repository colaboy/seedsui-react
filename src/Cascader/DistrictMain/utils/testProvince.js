// 判断是否是省
function testProvince(current, isProvince) {
  if (typeof isProvince === 'function') {
    return isProvince(current)
  }
  if (current.isProvince || current.type?.includes?.('province')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.provinceIds || []).includes(current.id)
}

export default testProvince
