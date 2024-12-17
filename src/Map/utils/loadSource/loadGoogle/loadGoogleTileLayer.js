/*
// 瓦片绘制也可以
return new L.tileLayer(
  'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&scale=2',
  {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    minZoom: 1,
    maxZoom: 19
  }
)
*/

// 加载google地图leaflet插件
function loadGoogleMutant() {
  return new Promise((resolve) => {
    if (window.L.tileLayer.currentTileLayer) {
      resolve(true)
      return
    }

    // Delete old script
    const scriptTag = document.getElementById('google-map-mutant-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    // 'https://unpkg.com/leaflet.gridlayer.googlemutant@latest/dist/Leaflet.GoogleMutant.js'
    Object.loadScript(
      '//res.waiqin365.com/d/seedsui/leaflet/js/Leaflet.GoogleMutant.js',
      {
        attrs: {
          id: 'google-map-mutant-js'
        }
      },
      (result) => {
        if (!result) {
          resolve(`googleMutant地图加载失败`)
        } else {
          window.L.tileLayer.currentTileLayer = function () {
            return window.L.gridLayer.googleMutant({ type: 'roadmap' })
          }
          resolve(true)
        }
      }
    )
  })
}

export default loadGoogleMutant
