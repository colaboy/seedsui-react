import formatPoint from './formatPoint'

// 测试使用
// import { GeoUtil } from 'seedsui-react'
// 内库使用
import GeoUtil from '../../../GeoUtil'

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
