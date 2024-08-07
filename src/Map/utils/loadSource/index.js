import loadLeaflet from './loadLeaflet'
import loadGoogle from './loadGoogle'
import loadGoogleMutant from './loadGoogleMutant'
import loadBMap from './loadBMap'
import loadBMapLayer from './loadBMapLayer'

// Load leaflet map source
async function loadSource(
  options = {
    key: '',
    type: '' // google
  }
) {
  // Load leaflet js and css
  let isOk = await loadLeaflet()
  if (typeof isOk === 'string') {
    return {
      errCode: 'LEAFLET_LOAD_ERROR',
      errMsg: isOk
    }
  }

  // Load google js
  if (options.type === 'google') {
    isOk = await loadGoogle(options?.key)
    if (typeof isOk === 'string') {
      return {
        errCode: 'GOOGLE_LOAD_ERROR',
        errMsg: isOk
      }
    }

    // Load google tileLayer plugin js
    isOk = await loadGoogleMutant()
    if (typeof isOk === 'string') {
      return {
        errCode: 'GOOGLE_MUTANT_LOAD_ERROR',
        errMsg: isOk
      }
    }
  }

  // Load bmap js
  if (options.type === 'bmap') {
    isOk = await loadBMap(options?.key)
    if (typeof isOk === 'string') {
      return {
        errCode: 'BMAP_LOAD_ERROR',
        errMsg: isOk
      }
    }

    // Load bmap tileLayer plugin js
    isOk = await loadBMapLayer()
    if (typeof isOk === 'string') {
      return {
        errCode: 'BMAP_LAYER_LOAD_ERROR',
        errMsg: isOk
      }
    }
  }

  return true
}

export default loadSource
