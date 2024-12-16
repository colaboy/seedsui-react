import defaultCountryCenter from './defaultCountryCenter'

// Create leaflet map
function createMap(container, { center, minZoom = 1, maxZoom = 20, zoom = 13 }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  if (!window.L?.tileLayer?.currentTileLayer) {
    return '缺少必要地图资源, 请检查APILoader参数是否正确, 或者key是否过期'
  }

  // 百度地图最小3
  if (window.BMap && minZoom < 3) {
    // eslint-disable-next-line
    minZoom = 3
  }

  let map = null

  let centerPoint = []
  if (center?.latitude && center?.longitude) {
    centerPoint = [center?.latitude, center?.longitude]
  }
  // 中国默认天安门
  else if (window.BMap) {
    centerPoint = [defaultCountryCenter['zh_CN'].latitude, defaultCountryCenter['zh_CN'].longitude]
  }
  // 国外默认白宫
  else {
    centerPoint = [defaultCountryCenter['other'].latitude, defaultCountryCenter['other'].longitude]
  }
  // Init leaflet map
  let config = {
    attributionControl: false, // 隐藏版权控件
    zoomControl: false, // 隐藏放大缩小控件
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoom: zoom,
    center: centerPoint
  }
  // 百度tile layer插件
  if (window?.L?.CRS?.Baidu) {
    config.crs = window.L.CRS.Baidu
  }

  map = window.L.map(container, config)

  // Add tileLayer
  let tileLayer = window.L.tileLayer.currentTileLayer()
  tileLayer.addTo(map)

  // Update tileLayer size
  // map.invalidateSize()

  return new Promise((resolve) => {
    tileLayer.on('load', function () {
      resolve(map)
    })
  })
}

export default createMap
