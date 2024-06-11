// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索附近
function overpassQueryNearby({ map, keyword, longitude, latitude, radius = 500 }) {
  var overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[${
    keyword || 'shop'
  }];out;`

  return new Promise((resolve) => {
    fetch(overpassUrl)
      .then((response) => response.json())
      .then((data) => {
        debugger
        // 显示查询结果
        if (data.elements.length > 0) {
          resolve(
            data.elements.map((item) => {
              return {
                name: item.tags.name,
                lat: item.lat,
                lon: item.lon
              }
            })
          )
        } else {
          resolve(locale('暂无数据', 'SeedsUI_no_data'))
        }
      })
      .catch((error) => {
        resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
      })
  })
}

export default overpassQueryNearby
