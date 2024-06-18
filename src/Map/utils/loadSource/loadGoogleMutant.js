// 加载google地图leaflet插件
function loadGoogleMutant() {
  return new Promise((resolve) => {
    if (window.L?.GridLayer?.GoogleMutant) {
      resolve(window.L?.GridLayer?.GoogleMutant)
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
          resolve(window.L?.GridLayer?.GoogleMutant)
        }
      }
    )
  })
}

export default loadGoogleMutant
