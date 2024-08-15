import GeoUtil from './../../../GeoUtil'

// 单个点转换
function getPoint(point, type) {
  if (!point?.longitude || !point?.latitude) {
    console.error('MapContainer coordTransform invalid parameter:', point)
    return null
  }
  // 无需要转换
  if (!point.type && !type) return point

  let newPoint = GeoUtil.coordtransform(
    [point.longitude, point.latitude],
    point.type || type,
    'wgs84'
  )
  return {
    ...point,
    type: 'wgs84',
    longitude: newPoint[0],
    latitude: newPoint[1]
  }
}

// 转成wgs84坐标
function coordTransform(points, type) {
  if (Array.isArray(points) && points.length) {
    return points.map((point) => {
      return getPoint(point, type)
    })
  } else if (toString.call(points) !== '[object Object]') {
    return getPoint(points, type)
  }
  return null
}

export default coordTransform
