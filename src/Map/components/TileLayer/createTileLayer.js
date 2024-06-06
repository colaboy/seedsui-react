import { loadGoogle, loadGoogleMutant, loadLeaflet } from './../../utils'

// Create leaflet tile layer
async function createTileLayer(map) {
  // Use google tileLayer
  if (window.L.gridLayer.googleMutant) {
    const tiles = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
  }
  // Use openStreetMap tileLayer
  else {
    const tiles = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
  }

  return map
}

export default createTileLayer
