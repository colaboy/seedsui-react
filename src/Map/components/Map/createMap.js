// Create leaflet map
function createMap(container, { center, zoom }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  // Init leaflet map
  const map = window.L.map(container, {
    attributionControl: false, // 隐藏版权控件
    zoomControl: false // 隐藏放大缩小控件
  }).setView([center?.latitude, center?.longitude], zoom)

  return map
}

export default createMap
