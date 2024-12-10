import coordsToFit from './../coordsToFit'

// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 搜索附近, keyword:搜索关键词
function bmapQueryNearby({ map, keyword, longitude, latitude, radius }) {
  if (!map?.currentMap || !longitude || !latitude) {
    return null
  }
  return new Promise((resolve) => {
    let centerCoord = coordsToFit({ longitude, latitude })
    let centerPoint = new window.BMap.Point(centerCoord.longitude, centerCoord.latitude)
    // 定位到当前位置
    map.currentMap.panTo(centerPoint)

    // 创建本地搜索对象
    let local = new window.BMap.LocalSearch(map.currentMap, {
      pageCapacity: 100,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
          let list = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const item = results.getPoi(i)

            if (!item.title && !item.address) continue
            // Leaflet only support wgs84
            let coord = coordsToFit({
              longitude: item.point.lng,
              latitude: item.point.lat,
              from: centerCoord.isInChina ? 'bd09' : 'wgs84',
              to: 'wgs84'
            })
            list.push({
              name: item.title,
              address: item.address,
              longitude: coord.longitude,
              latitude: coord.latitude
            })
          }
          resolve(list)
        } else {
          resolve(locale('查询失败'))
        }
      }
    })

    // 搜索附近
    if (centerPoint && radius) {
      local.searchNearby(keyword, centerPoint, radius)
    }
    // 搜索全部
    else {
      local.search(keyword)
    }
  })
}

export default bmapQueryNearby
