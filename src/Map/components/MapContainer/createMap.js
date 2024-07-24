// Create leaflet map
function createMap(container, { center, minZoom = 1, maxZoom = 20, zoom = 13 }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  // 百度地图最小3
  if (window.BMap && minZoom < 3) {
    // eslint-disable-next-line
    minZoom = 3
  }

  let map = null

  // Init leaflet map
  let config = {
    attributionControl: false, // 隐藏版权控件
    zoomControl: false, // 隐藏放大缩小控件
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoom: zoom,
    center: [center?.latitude || 53.895658919017706, center?.longitude || -132.7236492753227]
  }
  // 百度tile layer插件
  if (window?.L?.CRS?.Baidu) {
    config.crs = window.L.CRS.Baidu
  }

  map = window.L.map(container, config)
  return map
}

export default createMap
