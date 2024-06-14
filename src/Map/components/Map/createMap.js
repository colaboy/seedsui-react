// Create leaflet map
function createMap(container, { center, minZoom = 1, maxZoom = 20, zoom = 13 }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  let map = null

  // Init leaflet map
  let config = {
    attributionControl: false, // 隐藏版权控件
    zoomControl: false, // 隐藏放大缩小控件
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoom: zoom,
    center: [center?.latitude, center?.longitude]
  }
  // 百度tile layer插件
  if (window?.L?.CRS?.Baidu) {
    config.crs = window.L.CRS.Baidu
  }

  map = window.L.map(container, config).setView([0, 0], 1)
  return map
}

export default createMap
