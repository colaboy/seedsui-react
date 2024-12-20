// 加载google地图leaflet插件
function loadGoogleTileLayer() {
  window.L.tileLayer.currentTileLayer = function () {
    return new L.tileLayer(
      'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&scale=2'
    )
  }

  // maxBounds
  let southWest = window.L.latLng(-85.05112878, -Infinity)
  let northEast = window.L.latLng(85.05112878, Infinity)
  const maxBounds = window.L.latLngBounds(southWest, northEast)

  // maxZoom, minZoom
  window.L.tileLayer.currentTileLayer.config = {
    maxBounds,
    maxZoom: 18,
    minZoom: 1
  }
}

export default loadGoogleTileLayer
