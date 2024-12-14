import coordsToFit from './../coordsToFit'
import coordsToWgs84 from './../coordsToWgs84'

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
    // 中国转bd09再搜索
    let centerCoord = coordsToFit({ longitude, latitude, type: 'wgs84', inChinaTo: 'bd09' })
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
            // 坐标一律转成wgs84
            let coord = coordsToWgs84({
              longitude: item.point.lng,
              latitude: item.point.lat,
              type: centerCoord.isInChina ? 'bd09' : 'wgs84'
            })

            list.push({
              name: item.title,
              address: item.address,
              longitude: coord.longitude,
              latitude: coord.latitude,
              type: 'wgs84'
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
