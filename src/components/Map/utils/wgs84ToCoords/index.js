// 内库使用-start
import GeoUtil from './../../../../utils/GeoUtil'
// 内库使用-end

// 测试使用-start
// import { GeoUtil } from 'seedsui-react'
// 测试使用-end

// 单个点转换
function getPoint(point, type) {
  if (!point?.longitude || !point?.latitude) {
    console.error('MapContainer wgs84ToCoords invalid parameter:', point)
    return null
  }
  // 无需要转换
  if (!type) return point

  let newPoint = GeoUtil.coordtransform(
    [point.longitude, point.latitude],
    point.type || 'wgs84',
    type
  )
  return {
    ...point,
    type: type,
    longitude: newPoint[0],
    latitude: newPoint[1]
  }
}

// 转成wgs84坐标
function wgs84ToCoords(points, type) {
  if (Array.isArray(points) && points.length) {
    return points.map((point) => {
      return getPoint(point, type)
    })
  } else if (toString.call(points) === '[object Object]') {
    return getPoint(points, type)
  }
  return null
}

export default wgs84ToCoords
