// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'

// 搜索附近
function nearbySearch({ map, keyword, longitude, latitude, radius = 500 }) {
  return new Promise(async (resolve) => {
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places')
    let center = new google.maps.LatLng(latitude, longitude)

    const request = {
      // required parameters
      fields: ['displayName', 'location', 'businessStatus'],
      locationRestriction: {
        center: center,
        radius: radius
      },
      // optional parameters
      includedPrimaryTypes: [keyword],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en-US',
      region: 'us'
    }
    debugger
    try {
      const { places } = await Place.searchNearby(request)
      if (places.length) {
        console.log(places)
        resolve(places)
      } else {
        resolve(locale('暂无数据', 'SeedsUI_no_data'))
      }
    } catch (error) {
      resolve(locale('查询失败'))
    }
    debugger
  })
}

export default nearbySearch
