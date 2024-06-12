// Create leaflet tile layer
async function createTileLayer(map) {
  let tileLayer = null
  // Use google tileLayer
  if (window.L.gridLayer.googleMutant) {
    debugger
    tileLayer = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
  }
  // Use bmap tileLayer
  if (window.L.tileLayer.baiDuTileLayer) {
    tileLayer = window.L.tileLayer
      .baiDuTileLayer('qt=vtile&styles=pl&showtext=1&scaler=2&v=083')
      .addTo(map)
  }
  // Use openStreetMap tileLayer
  else {
    tileLayer = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
  }

  return tileLayer
}

export default createTileLayer
