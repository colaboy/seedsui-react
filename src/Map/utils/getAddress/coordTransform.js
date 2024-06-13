import GeoUtil from './../../../GeoUtil'

// 坐标转换
function coordTransform({ longitude, latitude, from }) {
  // 转为百度坐标
  if (window.BMap) {
    let bdPoint = GeoUtil.coordtransform([longitude, latitude], from, 'bd09')
    longitude = bdPoint[0]
    latitude = bdPoint[1]
  }
  // 转国测局坐标
  else if (window.AMap) {
    let gcjPoint = GeoUtil.coordtransform([longitude, latitude], from, 'gcj02')
    longitude = gcjPoint[0]
    latitude = gcjPoint[1]
  }
  // 转为GPS坐标
  else {
    let wgs84Point = GeoUtil.coordtransform([longitude, latitude], from, 'wgs84')
    longitude = wgs84Point[0]
    latitude = wgs84Point[1]
  }
  return { longitude, latitude }
}

export default coordTransform
