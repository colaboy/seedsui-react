// Create leaflet map
function createMap(container, { center, zoom }) {
  if (!window.L) {
    return '请在Map组件需要使用APILoader包裹'
  }

  let map = null

  // 注意将map的crs赋值 crs: L.CRS.Baidu 详情请阅读示例页面
  if (window.L.tileLayer.BMapLayer) {
    map = L.map(container, {
      crs: L.CRS.Baidu,
      attributionControl: false,
      center: [center?.latitude, center?.longitude],
      zoom: zoom
    })
  }
  // Init leaflet map
  else {
    map = window.L.map(container, {
      attributionControl: false, // 隐藏版权控件
      zoomControl: false // 隐藏放大缩小控件
    }).setView([center?.latitude, center?.longitude], zoom)
  }
  return map
}

export default createMap
