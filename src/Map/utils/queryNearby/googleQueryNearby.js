// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索附近
function nearbySearch({ map, keyword, longitude, latitude, radius }) {
  return new Promise(async (resolve) => {
    const service = new window.google.maps.places.PlacesService(map)
    let center = latitude && longitude ? new window.google.maps.LatLng(latitude, longitude) : null

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
          let longitude = place.geometry?.location?.lng?.()
          let latitude = place.geometry?.location?.lat?.()
          if (longitude && latitude) {
            list.push({
              longitude: longitude,
              latitude: latitude,
              name: place.name,
              address: place.vicinity
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
