import coordsToFit from './../coordsToFit'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

// 搜索附近, keyword:搜索关键词
function bmapQueryNearby({ map, keyword, longitude, latitude, type, radius }) {
  if (!map?.currentMap || !longitude || !latitude || !type) {
    return null
  }
  return new Promise((resolve) => {
    // 中国转bd09再搜索
    let centerCoord = coordsToFit({
      longitude,
      latitude,
      type,
      inChinaTo: 'bd09',
      outChinaTo: 'wgs84'
    })
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

            let longitude = item.point.lng
            let latitude = item.point.lat
            let type = centerCoord.isInChina ? 'bd09' : 'wgs84'

            list.push({
              name: item.title,
              address: item.address,
              longitude: longitude,
              latitude: latitude,
              type: type
            })
          }
          resolve(list)
        } else {
          resolve(LocaleUtil.locale('查询失败', 'SeedsUI_query_failed'))
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
