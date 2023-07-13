import formatPoint from './formatPoint'

// 国测局百度坐标
function pointToBdPoint(point) {
  // eslint-disable-next-line
  point = formatPoint(point)

  if (point) {
    return new window.BMap.Point(point[0], point[1])
  }
  return null
}

export default pointToBdPoint
