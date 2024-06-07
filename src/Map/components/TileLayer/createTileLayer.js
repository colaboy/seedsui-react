// Create leaflet tile layer
async function createTileLayer(map) {
  let tileLayer = null
  // Use google tileLayer
  if (window.L.gridLayer.googleMutant) {
    tileLayer = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
  }
  // Use openStreetMap tileLayer
  else {
    tileLayer = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
  }

  return tileLayer
}

export default createTileLayer
