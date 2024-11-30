// 判断是否是直筒子市
function testPrefecture(current, isPrefecture) {
  if (typeof isPrefecture === 'function') {
    return isPrefecture(current)
  }
  if (current.isPrefecture || current.type?.includes?.('prefecture')) {
    return true
  }

  if (!current?.id) return false
  if (typeof current?.id === 'number') current.id = '' + current.id
  return (window.prefectureIds || []).includes(current.id)
}

export default testPrefecture
