import formatPoint from './formatPoint'
import gcjToBdCoord from './gcjToBdCoord'

// 国测局百度坐标
function gcjToBdPoint(point) {
  // eslint-disable-next-line
  point = formatPoint(point)
  // eslint-disable-next-line
  point = gcjToBdCoord(point)

  if (point) {
    return new BMap.Point(point[0], point[1])
  }
  return null
}

export default gcjToBdPoint
