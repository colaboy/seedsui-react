import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索附近, keyword:搜索关键词
function bmapQueryNearby({ map, keyword, longitude, latitude, radius }) {
  if (!longitude || !latitude) {
    return null
  }
  return new Promise((resolve) => {
    let bdPoint = GeoUtil.coordtransform([longitude, latitude], 'wgs84', 'bd09')
    bdPoint = new window.BMap.Point(bdPoint[0], bdPoint[1])
    // 创建本地搜索对象
    let local = new window.BMap.LocalSearch(map, {
      pageCapacity: 20,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
          let list = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const item = results.getPoi(i)

            if (!item.title && !item.address) continue
            // Leaflet only support wgs84
            let point = GeoUtil.coordtransform([item.point.lng, item.point.lat], 'bd09', 'wgs84')
            list.push({
              name: item.title,
              address: item.address,
              longitude: point[0],
              latitude: point[1]
            })
          }
          resolve(list)
        } else {
          resolve(locale('查询失败'))
        }
      }
    })

    // 搜索附近
    if (bdPoint && radius) {
      local.searchNearby(keyword, bdPoint, radius)
    }
    // 搜索全部
    else {
      // local.search(keyword) // 此方法只能搜索行政区名称
      local.searchNearby(keyword, bdPoint)
    }
  })
}

export default bmapQueryNearby
