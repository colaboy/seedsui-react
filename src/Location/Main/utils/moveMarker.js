import gcjToBdPoint from './gcjToBdPoint'
import pointToBdPoint from './pointToBdPoint'
// 移动点
function moveMarker(marker, { point, type }) {
  if (!marker || !point) return
  if (type === 'gcj02') {
    // eslint-disable-next-line
    point = gcjToBdPoint(point)
  } else {
    // eslint-disable-next-line
    point = pointToBdPoint(point)
  }
  marker.setPosition(point)
}

export default moveMarker
