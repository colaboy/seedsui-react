// 内库使用-start
import GeoUtil from './../../../../utils/GeoUtil'
// 内库使用-end

// 测试使用-start
// import { GeoUtil } from 'seedsui-react'
// 测试使用-start

// 坐标自动转换
/*
# 绘制地图瓦片 currentTileLayer
## 百度
- 国内: bd09渲染
- 国外: wgs84渲染

## 高德与Google
- 国内: gcj02渲染
- 国外: wgs84渲染





# 搜索与搜索附近 queryNearby
## 百度
- 国内搜索: bd09搜索
- 国内搜索结果: bd09
- 国外搜索: wgs84搜索
- 国外搜索结果: wgs84

## 高德与Google
- 国内搜索: gcj02搜索
- 国内搜索结果: 返回gcj02
- 国外搜索: wgs84搜索
- 国外搜索结果: 返回wgs84






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
- 国内,国外: wgs84定位, panTo时转为对应的坐标系即可



# Leaflet API
# Leaflet绘制点L.marker
- 国内百度: 使用bd09绘点
- 国内google与高德: 使用gcj02绘点
- 国外百度,google与高德: 使用wgs84绘点

# Leaflet中心位置panTo
- 国内百度: 使用bd09绘点
- 国内google与高德: 使用gcj02绘点
- 国外百度,google与高德: 使用wgs84绘点
*/
function coordToFit(coord) {
  // 参数不合法
  if (
    (!coord?.inChinaTo && !coord?.outChinaTo) ||
    !coord?.longitude ||
    !coord?.latitude ||
    !coord?.type
  ) {
    return coord
  }

  // 是否在中国
  let isInChina = GeoUtil.isInChina([coord.longitude, coord.latitude]) === true
  coord.isInChina = isInChina

  // 不在中国
  if (!isInChina) {
    // 不在中国转为指定坐标
    if (coord.outChinaTo) {
      let [longitude, latitude] = GeoUtil.coordtransform(
        [coord.longitude, coord.latitude],
        coord.type,
        coord.outChinaTo
      )

      return {
        ...coord,
        longitude,
        latitude,
        type: coord.outChinaTo
      }
    }
    return coord
  }
  // 在中国
  else {
    let [longitude, latitude] = GeoUtil.coordtransform(
      [coord.longitude, coord.latitude],
      coord.type,
      coord.inChinaTo
    )
    return {
      ...coord,
      longitude,
      latitude,
      type: coord.inChinaTo
    }
  }
}

// 国内转gcj02, 国外转wgs84
function coordsToFit(coords, { inChinaTo, outChinaTo } = {}) {
  if (Array.isArray(coords) && coords.length) {
    return coords.map((coord) => {
      if (!coord.inChinaTo && inChinaTo) {
        coord.inChinaTo = inChinaTo
      }
      if (!coord.outChinaTo && outChinaTo) {
        coord.outChinaTo = outChinaTo
      }
      return coordToFit(coord)
    })
  } else if (toString.call(coords) === '[object Object]') {
    if (!coords.inChinaTo && inChinaTo) {
      coords.inChinaTo = inChinaTo
    }
    if (!coords.outChinaTo && outChinaTo) {
      coords.outChinaTo = outChinaTo
    }
    return coordToFit(coords)
  }
  return null
}

export default coordsToFit
