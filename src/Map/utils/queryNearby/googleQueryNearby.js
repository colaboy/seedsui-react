import coordsToFit from './../coordsToFit'
import coordsToWgs84 from './../coordsToWgs84'

// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 搜索附近
function nearbySearch({ map, keyword, longitude, latitude, type, radius }) {
  if (!map?.currentMap || !longitude || !latitude || !type) {
    return null
  }

  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 中国转gcj02再搜索
    let centerCoord = coordsToFit({
      longitude,
      latitude,
      type: type,
      inChinaTo: 'gcj02',
      outChinaTo: 'wgs84'
    })

    const service = new window.google.maps.places.PlacesService(map.currentMap)
    let center =
      latitude && longitude
        ? new window.google.maps.LatLng(centerCoord.latitude, centerCoord.longitude)
        : null

    // 构建请求
    const params = {
      location: center
    }
    let method = 'textSearch'

    // 搜索附近
    if (center && radius) {
      params.radius = radius // 搜索半径，单位为米
      params.keyword = keyword
      method = 'nearbySearch'
    }
    // 搜索全部
    else {
      params.query = keyword
    }

    service[method](params, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let list = []
        for (let i = 0; i < results.length; i++) {
          const place = results[i]
          if (!place.name && !place.vicinity) continue

          let longitude = place.geometry?.location?.lng?.()
          let latitude = place.geometry?.location?.lat?.()
          let type = centerCoord.isInChina ? 'gcj02' : 'wgs84'

          if (longitude && latitude) {
            list.push({
              longitude: longitude,
              latitude: latitude,
              name: place.name,
              address: place.formatted_address || place.vicinity || place.name,
              type: type
            })
          }
        }
        resolve(list)
      } else {
        resolve(locale('查询失败'))
      }
    })
  })
}

export default nearbySearch
