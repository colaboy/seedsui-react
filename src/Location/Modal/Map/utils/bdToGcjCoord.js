import GeoUtil from '../../../../GeoUtil'
import formatPoint from './formatPoint'

// 百度转国测局坐标
function bdToGcjCoord(point) {
  // eslint-disable-next-line
  point = formatPoint(point)

  if (point) {
    return GeoUtil.coordtransform(point, 'bd09', 'gcj02')
  }

  return null
}

export default bdToGcjCoord
