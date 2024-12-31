import loadLeaflet from './loadLeaflet'
import loadGoogle from './loadGoogle'
import loadBaidu from './loadBaidu'
import loadOpenstreet from './loadOpenstreet'

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
    return isOk
  }

  // Load bmap js
  if (options.type === 'bmap') {
    isOk = await loadBaidu(options?.key)
    return isOk
  }

  // Load open street
  await loadOpenstreet()
  return true
}

export default loadSource
