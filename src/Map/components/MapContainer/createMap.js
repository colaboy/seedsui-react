import defaultCountryCenter from './defaultCountryCenter'

// Create leaflet map
function createMap(container, { center, minZoom, maxZoom, zoom }) {
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
    maxZoom: maxZoom || window.L.tileLayer?.currentTileLayer?.maxZoom || 20,
    minZoom: minZoom || window.L.tileLayer?.currentTileLayer?.minZoom || 1,
    zoom: zoom || window.L.tileLayer?.currentTileLayer?.zoom || 13,
    center: centerPoint
  }

  // Init leaflet map config: crs
  if (window.L.tileLayer?.currentTileLayer?.crs) {
    config.crs = window.L.tileLayer.currentTileLayer.crs
  }
  // Init leaflet map config: maxBounds
  if (window.L.tileLayer.currentTileLayer?.maxBounds) {
    config.maxBounds = window.L.tileLayer.currentTileLayer.maxBounds
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
