// 加载地图资源
function loadLeaflet() {
  return new Promise((resolve) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    // Delete old css
    const cssTag = document.getElementById('leaflet-css')
    if (cssTag) {
      cssTag.parentNode.removeChild(cssTag)
    }

    // Load css
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    // 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.href = '//res.waiqin365.com/d/seedsui/leaflet/css/leaflet.css'
    link.id = 'leaflet-css'
    document.head.appendChild(link)

    // Delete old script
    const scriptTag = document.getElementById('leaflet-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    // 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    Object.loadScript(
      '//res.waiqin365.com/d/seedsui/leaflet/js/leaflet.js',
      {
        attrs: {
          id: 'leaflet-js'
          // integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
          // crossorigin: ''
        }
      },
      (result) => {
        if (!result) {
          resolve(`leaflet加载失败`)
        } else {
          resolve(window.L)
        }
      }
    )
  })
}

export default loadLeaflet
