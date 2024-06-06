import { loadGoogle, loadGoogleMutant, loadLeaflet } from './../utils'

// Create leaflet map
async function createMap(
  type, // google
  options = {
    tileType: '' // google
  }
) {
  // Load resources
  let isOk = await loadLeaflet()
  if (typeof isOk === 'string') {
    return isOk
  }
  if (type === 'google') {
    isOk = await loadGoogle()
    if (typeof isOk === 'string') {
      return isOk
    }
  }

  // Init leaflet map
  const map = window.L.map('map', { attributionControl: false }).setView([51.505, -0.09], 13)

  // Use Google Map in leaflet tileLayer
  if (type === 'google' && options?.tileType === 'google') {
    isOk = await loadGoogleMutant()
    if (typeof isOk === 'string') {
      return isOk
    }
    const tiles = window.L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(map)
    return map
  }
  // Use default openStreetMap in leaflet tileLayer
  else {
    const tiles = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
  }

  return map
}

export default createMap
