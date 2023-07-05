import GeoUtil from '../../../GeoUtil'
import formatPoint from './formatPoint'

// 国测局转百度坐标
function gcjToBdCoord(point) {
  // eslint-disable-next-line
  point = formatPoint(point)

  if (point) {
    return GeoUtil.coordtransform(point, 'gcj02', 'bd09')
  }

  return null
}

export default gcjToBdCoord
