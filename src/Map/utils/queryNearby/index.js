import bmapQueryNearby from './bmapQueryNearby'
import googleQueryNearby from './googleQueryNearby'
import defaultQueryNearby from './defaultQueryNearby'

// 搜索附近
async function queryNearby({ map, keyword, longitude, latitude, radius }) {
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
