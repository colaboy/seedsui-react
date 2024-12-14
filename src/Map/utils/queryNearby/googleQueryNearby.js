import coordsToFit from './../coordsToFit'
import coordsToWgs84 from './../coordsToWgs84'

// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 搜索附近
function nearbySearch({ map, keyword, longitude, latitude, radius }) {
  if (!map?.currentMap || !longitude || !latitude) {
    return null
  }

  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 中国转bd09再搜索
    let centerCoord = coordsToFit({ longitude, latitude, type: 'wgs84', inChinaTo: 'gcj02' })

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
          if (longitude && latitude) {
            // 坐标一律转成wgs84
            let coord = coordsToWgs84({
              longitude: longitude,
              latitude: latitude,
              type: centerCoord.isInChina ? 'gcj02' : 'wgs84'
            })

            list.push({
              longitude: coord.longitude,
              latitude: coord.latitude,
              name: place.name,
              address: place.vicinity,
              type: 'wgs84'
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
