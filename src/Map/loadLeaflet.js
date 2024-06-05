// 加载地图资源
function loadMapResource() {
  return new Promise((resolve, reject) => {
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
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.id = 'leaflet-css'
    document.head.appendChild(link)

    // Delete old script
    const scriptTag = document.getElementById('leaflet-js')
    if (scriptTag) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    // Load js
    Object.loadScript(
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      {
        attrs: {
          id: 'leaflet-js',
          integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
          crossorigin: ''
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

export default loadMapResource
