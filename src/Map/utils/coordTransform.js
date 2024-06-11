import GeoUtil from './../../GeoUtil'

// 坐标转换
function coordTransform({ longitude, latitude }, type) {
  // 转为GPS坐标
  if (window.google || !type) {
    let wgs84Point = GeoUtil.coordtransform([longitude, latitude], type, 'wgs84')
    longitude = wgs84Point[0]
    latitude = wgs84Point[1]
  }
  // 转为百度坐标
  else if (window.BMap) {
    let bdPoint = GeoUtil.coordtransform([longitude, latitude], type, 'bd09')
    longitude = bdPoint[0]
    latitude = bdPoint[1]
  }
  return { longitude, latitude }
}

export default coordTransform
