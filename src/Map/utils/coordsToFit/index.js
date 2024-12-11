// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// 坐标自动转换
/*
绘制地图瓦片: 1.国内百度, 转为bd09坐标绘制; 2.国内高德与google转为gcj02坐标绘制; 3.国外一律使用默认的wgs84绘制;
leaflet绘制点L.marker: 一律使用wgs84绘制
搜索附近: 1.国内百度, 由bd09转为wgs84; 2.国内高德和google由gcj02转为wgs84; 3.国外一律不用转, 默认返回都是wgs84;
定位: 一律获取wgs84坐标位置
*/
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

// 国内转gcj02, 国外转wgs84
function coordsToFit(coords) {
  if (Array.isArray(coords) && coords.length) {
    return coords.map((coord) => {
      return coordToFit(coord)
    })
  } else if (toString.call(coords) === '[object Object]') {
    return coordToFit(coords)
  }
  return null
}

export default coordsToFit
