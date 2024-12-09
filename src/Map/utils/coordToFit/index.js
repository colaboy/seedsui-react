// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// 坐标自动转换
function coordToFit({ longitude, latitude, from = 'wgs84', to }) {
  // 定向转换
  if (from && to) {
    let coord = GeoUtil.coordtransform([longitude, latitude], from, to)
    return {
      longitude: coord[0],
      latitude: coord[1]
    }
  }

  // 自动转换: 在中国转, 国外不转
  let isInChina = GeoUtil.isInChina([longitude, latitude]) === true

  // 转为百度坐标: 中国转, 国外不转
  if (window.BMap) {
    let bdPoint = isInChina
      ? GeoUtil.coordtransform([longitude, latitude], from, 'bd09')
      : [longitude, latitude]
    // eslint-disable-next-line
    longitude = bdPoint[0]
    // eslint-disable-next-line
    latitude = bdPoint[1]
  }
  // 转国测局坐标
  else if (window.AMap) {
    let gcjPoint = GeoUtil.coordtransform([longitude, latitude], from, 'gcj02')
    // eslint-disable-next-line
    longitude = gcjPoint[0]
    // eslint-disable-next-line
    latitude = gcjPoint[1]
  }
  // 转为GPS坐标
  else {
    let wgs84Point = GeoUtil.coordtransform([longitude, latitude], from, 'wgs84')
    // eslint-disable-next-line
    longitude = wgs84Point[0]
    // eslint-disable-next-line
    latitude = wgs84Point[1]
  }
  return { longitude, latitude, isInChina }
}

export default coordToFit
