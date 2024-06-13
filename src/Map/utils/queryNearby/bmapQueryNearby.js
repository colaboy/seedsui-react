import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索附近, keyword:搜索关键词
function bmapQueryNearby({ map, keyword, longitude, latitude, radius }) {
  let bdPoint = longitude && latitude ? new BMap.Point(longitude, latitude) : null

  return new Promise((resolve) => {
    // 创建本地搜索对象
    let local = new window.BMap.LocalSearch(map, {
      pageCapacity: 20,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
          let res = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const item = results.getPoi(i)
            // Leaflet only support wgs84
            let point = GeoUtil.coordtransform([item.point.lng, item.point.lat], 'bd09', 'wgs84')
            res.push({
              id: item.uid,
              name: item.title,
              address: item.address,
              longitude: point[0],
              latitude: point[1]
            })
          }
          resolve(res)
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
      local.search(keyword)
    }
  })
}

export default bmapQueryNearby
