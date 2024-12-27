import loadBaiduMap from './loadBaiduMap'
import loadBaiduTileLayer from './loadBaiduTileLayer'

// 加载BMap地图资源
async function loadBaidu(key) {
  let isOk = await loadBaiduMap(key)
  if (typeof isOk === 'string') {
    return {
      errCode: 'BMAP_LOAD_ERROR',
      errMsg: isOk
    }
  }
  isOk = await loadBaiduTileLayer()
  if (typeof isOk === 'string') {
    return {
      errCode: 'BMAP_LAYER_LOAD_ERROR',
      errMsg: isOk
    }
  }
}

export default loadBaidu
