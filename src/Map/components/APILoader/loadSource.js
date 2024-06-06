import { loadGoogle, loadGoogleMutant, loadLeaflet } from './../../utils'

// Load leaflet map source
async function loadSource(
  options = {
    type: '', // google
    tileType: '' // google
  }
) {
  // Load leaflet js and css
  let isOk = await loadLeaflet()
  if (typeof isOk === 'string') {
    return isOk
  }

  // Load google js
  if (options.type === 'google') {
    isOk = await loadGoogle()
    if (typeof isOk === 'string') {
      return isOk
    }
  }

  // Load google tileLayer plugin js
  if (options?.type === 'google' && options?.tileType === 'google') {
    isOk = await loadGoogleMutant()
    if (typeof isOk === 'string') {
      return isOk
    }
  }

  return true
}

export default loadSource
