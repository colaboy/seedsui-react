// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// 坐标自动转换
/*
# 绘制地图瓦片
## 百度
- 国内: wgs84转为bd09渲染
- 国外: wgs84直接渲染

## 高德与Google
- 国内: wgs84转为gcj02渲染
- 国外: wgs84直接渲染



# 搜索附近
## 百度
- 国内搜索: wgs84转bd09后搜索
- 国内搜索结果: bd09转wgs84返回
- 国外搜索: wgs84搜索
- 国外搜索结果: wgs84直接返回

## 高德与Google
- 国内搜索: wgs84转gcj02后搜索
- 国内搜索结果: gcj02转wgs84返回
- 国外搜索: wgs84搜索
- 国外搜索结果: wgs84直接返回






# 地址逆解析
## 百度
- 国内: wgs84转bd09后解析
- 国内解析结果: bd09转wgs84返回
- 国外: wgs84解析
- 国外解析结果: wgs84直接返回

## 高德与Google
- 国内: wgs84转gcj02后解析
- 国内解析结果: gcj02转wgs84返回
- 国外: wgs84解析
- 国外解析结果: wgs84直接返回




# 获取当前位置
- 国内,国外: wgs84定位



# Leaflet API
# Leaflet绘制点L.marker
- 国内,国外: 使用wgs84绘点

# Leaflet中心位置panTo
- 国内,国外: wgs84
*/
function coordToFit(coord) {
  // 参数不合法
  if (!coord?.inChinaTo || !coord?.longitude || !coord?.latitude || !coord?.type) {
    return coord
  }

  // 是否在中国
  let isInChina = GeoUtil.isInChina([coord.longitude, coord.latitude]) === true
  coord.isInChina = isInChina

  // 不在中国原样返回
  if (!isInChina) {
    return coord
  }

  // 在中国转为中国坐标bd09或gcj02
  let newPoint = isInChina
    ? GeoUtil.coordtransform([coord.longitude, coord.latitude], coord.type, coord.inChinaTo)
    : [coord.longitude, coord.latitude]

  let longitude = newPoint[0]
  let latitude = newPoint[1]
  return {
    ...coord,
    longitude,
    latitude,
    type: coord.inChinaTo
  }
}

// 国内转gcj02, 国外转wgs84
function coordsToFit(coords, inChinaTo) {
  if (Array.isArray(coords) && coords.length) {
    return coords.map((coord) => {
      if (!coord.inChinaTo) {
        coord.inChinaTo = inChinaTo
      }
      return coordToFit(coord)
    })
  } else if (toString.call(coords) === '[object Object]') {
    if (!coords.inChinaTo) {
      coords.inChinaTo = inChinaTo
    }
    return coordToFit(coords)
  }
  return null
}

export default coordsToFit
