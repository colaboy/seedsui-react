// Create leaflet map
function createMap(container) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  // Init leaflet map
  const map = window.L.map(container, {
    attributionControl: false,
    zoomControl: false // 隐藏放大缩小控件
  }).setView([51.505, -0.09], 13)

  return map
}

export default createMap