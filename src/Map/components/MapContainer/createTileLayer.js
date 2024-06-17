// Create leaflet tile layer
async function createTileLayer(map) {
  return new Promise((resolve) => {
    let tileLayer = null
    // Use google tileLayer
    if (window.L.gridLayer.googleMutant) {
      tileLayer = window.L.gridLayer.googleMutant({ type: 'roadmap' })
    }
    // Use baidu tileLayer
    else if (window.L.tileLayer.baiduTileLayer) {
      tileLayer = window.L.tileLayer.baiduTileLayer('qt=vtile&styles=pl&showtext=1&scaler=2&v=083')
    }
    // Use openStreetMap tileLayer
    else {
      tileLayer = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    }
    tileLayer.addTo(map)

    tileLayer.on('load', function () {
      resolve(tileLayer)
    })
  })
}

export default createTileLayer
