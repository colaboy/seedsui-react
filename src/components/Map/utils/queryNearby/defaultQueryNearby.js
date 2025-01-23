// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 搜索附近
function overpassQueryNearby({ map, keyword, longitude, latitude, radius }) {
  let nearQuery = radius ? `(around:${radius},${latitude},${longitude})` : ''

  const overpassQuery = `
        [out:json];
        node${nearQuery}["${keyword}"];
        out center;
    `

  return new Promise((resolve) => {
    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`)
      .then((response) => response.json())
      .then((data) => {
        // 显示查询结果
        if (data?.elements?.length > 0) {
          let list = []
          for (let item of data.elements) {
            let name = item.tags.name
            let address =
              (item?.tags?.['addr:city'] || '') +
              (item?.tags?.['addr:housename'] || '') +
              (item?.tags?.['addr:postcode'] || '') +
              (item?.tags?.['addr:street'] || '')

            if (!name && !address) continue
            list.push({
              name: name,
              latitude: item.lat,
              longitude: item.lon,
              address: address,
              type: 'wgs84'
            })
          }
          resolve(list)
        } else {
          resolve([])
        }
      })
      .catch((error) => {
        resolve(LocaleUtil.locale('查询失败', 'SeedsUI_query_failed'))
      })
  })
}

export default overpassQueryNearby
