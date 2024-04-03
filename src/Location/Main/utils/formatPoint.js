// 标准化point
function formatPoint(point) {
  if (toString.call(point) === '[object Object]') {
    if (point.lng && point.lat) {
      // eslint-disable-next-line
      point = [point.lng, point.lat]
    } else if (point.longitude && point.latitude) {
      // eslint-disable-next-line
      point = [point.longitude, point.latitude]
    }
  }
  if (Array.isArray(point) && point.length === 2) {
    return point
  }
  return null
}

export default formatPoint
