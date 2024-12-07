// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// 经实验发现: 不能在绘制处纠偏, 否则拖拽点会有很大的问题
// 纠偏: 中国gcj02或bd09, 国外wgs84
function correctCoord(point) {
  if (!point?.longitude || !point?.latitude) {
    console.error('correctCoord invalid parameter:', point)
    return null
  }

  let isChina = GeoUtil.isInChina([point.longitude, point.latitude])
  if (isChina === true) {
    if (window.BMap) {
      let newPoint = GeoUtil.coordtransform([point.longitude, point.latitude], 'wgs84', 'bd09')
      return {
        ...point,
        longitude: newPoint[0],
        latitude: newPoint[1]
      }
    }
    if (window.google || window.AMap) {
      let newPoint = GeoUtil.coordtransform([point.longitude, point.latitude], 'wgs84', 'gcj02')
      return {
        ...point,
        longitude: newPoint[0],
        latitude: newPoint[1]
      }
    }
  }

  return point
}

export default correctCoord
