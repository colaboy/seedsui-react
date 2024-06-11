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
        // 显示查询结果
        if (data?.elements?.length > 0) {
          let result = data.elements.map((item) => {
            return {
              id: item.id || null,
              name: item.tags.name,
              latitude: item.lat,
              longitude: item.lon,
              address:
                (item?.tags?.['addr:city'] || '') +
                (item?.tags?.['addr:housename'] || '') +
                (item?.tags?.['addr:postcode'] || '') +
                (item?.tags?.['addr:street'] || '')
            }
          })
          resolve(result)
        } else {
          resolve(locale('暂无数据', 'SeedsUI_no_data'))
        }
      })
      .catch((error) => {
        resolve(locale('查询失败'))
      })
  })
}

export default overpassQueryNearby
