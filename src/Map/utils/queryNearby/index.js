import coordTransform from './../coordTransform'
import bmapQueryNearby from './bmapQueryNearby'
import googleQueryNearby from './googleQueryNearby'
import defaultQueryNearby from './defaultQueryNearby'

// 搜索附近
async function queryNearby({ map, keyword, longitude: lng, latitude: lat, type, radius = 500 }) {
  // 坐标转换
  let { longitude, latitude } = coordTransform({ longitude: lng, latitude: lat }, type)

  let result = null
  if (window.google) {
    result = await googleQueryNearby({ map, keyword, longitude, latitude, radius })
  } else if (window.BMap) {
    result = await bmapQueryNearby({ map, keyword, longitude, latitude, radius })
  } else {
    result = await defaultQueryNearby({ map, keyword, longitude, latitude, radius })
  }
  return result
}

export default queryNearby
