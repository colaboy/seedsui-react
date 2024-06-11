import bmapQueryNearby from './bmapQueryNearby'
import googleQueryNearby from './googleGetAddress'
import defaultQueryNearby from './defaultQueryNearby'

// 搜索附近
async function queryNearby({ longitude, latitude }, type) {
  // 坐标转换
  let { longitude, latitude } = coordTransform({ longitude: lng, latitude: lat }, type)

  let result = null
  if (window.google) {
    result = await googleQueryNearby({ longitude, latitude }, type)
  } else if (window.BMap) {
    result = await bmapQueryNearby({ longitude, latitude }, type)
  } else {
    result = await defaultQueryNearby({ longitude, latitude }, type)
  }
  return result
}

export default queryNearby
