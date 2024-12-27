import defaultCountryCenter from './defaultCountryCenter'

// Create leaflet map
function createMap(container, { center, minZoom, maxZoom, zoom }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  if (!window.L?.tileLayer?.currentTileLayer) {
    return '缺少必要地图资源, 请检查APILoader参数是否正确, 或者key是否过期'
  }

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
  // Init leaflet map config
  let config = {
    attributionControl: false, // 隐藏版权控件
    zoomControl: false, // 隐藏放大缩小控件
    center: centerPoint,
    ...(window.L.tileLayer?.currentTileLayer?.config || {}),
    maxZoom: maxZoom || window.L.tileLayer?.currentTileLayer?.config?.maxZoom || 18,
    minZoom: minZoom || window.L.tileLayer?.currentTileLayer?.config?.minZoom || 3,
    zoom: zoom || window.L.tileLayer?.currentTileLayer?.config?.zoom || 13
  }

  // Leaflet map
  let map = window.L.map(container, config)

  // TileLayer error
  if (!window.L.tileLayer?.currentTileLayer) {
    return map
  }

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
