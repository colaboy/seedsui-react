import coordsToFit from './../coordsToFit'

// 内库使用-start
// import LocaleUtil from './../../../../../utils/LocaleUtil'
// 内库使用-end

// 测试使用-start
import { LocaleUtil } from 'seedsui-react'
// 测试使用-end

// 搜索附近
async function nearbySearch({ map, keyword, longitude, latitude, type, radius }) {
  if (!map?.currentMap || !longitude || !latitude || !type) {
    return null
  }

  const { Place, SearchNearbyRankPreference } = await window.google.maps.importLibrary('places')
  const request = {
    // required parameters
    fields: ['displayName', 'location', 'businessStatus', 'formattedAddress'],
    // optional parameters
    maxResultCount: 20,
    language: window.language || 'en-US',
    region: 'us'
  }

  // 中国转gcj02再搜索
  let centerCoord = coordsToFit({
    longitude,
    latitude,
    type: type,
    inChinaTo: 'gcj02',
    outChinaTo: 'wgs84'
  })
  let center =
    latitude && longitude
      ? new window.google.maps.LatLng(centerCoord.latitude, centerCoord.longitude)
      : null

  // 结果列表
  let placeList = []

  // 搜索附近
  if (center && radius) {
    request.rankPreference = SearchNearbyRankPreference.DISTANCE
    request.locationRestriction = {
      center: center,
      radius: 500
    }
    request.includedPrimaryTypes = keyword.split(',')
    let { places } = await Place.searchNearby(request)
    placeList = places
  }
  // 搜索全部
  else {
    // request.includedType = "restaurant"
    request.textQuery = keyword
    request.locationBias = center
    let { places } = await Place.searchByText(request)
    placeList = places
  }

  // 格式化结果
  if (placeList.length) {
    let list = []
    for (let place of placeList) {
      if (place.location.lat() && place.location.lng()) {
        list.push({
          longitude: place.location.lng(),
          latitude: place.location.lat(),
          name: place.displayName,
          address: place.formattedAddress || place.displayName,
          type: centerCoord.isInChina ? 'gcj02' : 'wgs84'
        })
      }
    }
    return list
  }

  return LocaleUtil.locale('查询失败', 'SeedsUI_query_failed')
}

export default nearbySearch
