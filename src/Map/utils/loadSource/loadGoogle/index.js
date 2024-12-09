import loadGoogleMap from './loadGoogleMap'
import loadGoogleTileLayer from './loadGoogleTileLayer'

// 加载BMap地图资源
async function loadGoogle(key) {
  let isOk = await loadGoogleMap(key)
  if (typeof isOk === 'string') {
    return {
      errCode: 'GOOGLE_LOAD_ERROR',
      errMsg: isOk
    }
  }
  isOk = await loadGoogleTileLayer()
  if (typeof isOk === 'string') {
    return {
      errCode: 'GOOGLE_MUTANT_LOAD_ERROR',
      errMsg: isOk
    }
  }
  return true
}

export default loadGoogle
