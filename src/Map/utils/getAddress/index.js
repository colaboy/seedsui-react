import coordTransform from './coordTransform'
import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'

async function defaultGetAddress({ longitude: lng, latitude: lat, type = 'wgs84' }) {
  let result = null

  // 坐标转换
  let { longitude, latitude } = coordTransform({ longitude: lng, latitude: lat, from: type })

  if (window.google) {
    result = await googleGetAddress({ longitude, latitude })
  } else if (window.BMap) {
    result = await bmapGetAddress({ longitude, latitude })
  } else {
    result = await defaultGetAddress({ longitude, latitude })
  }
  return result
}

// 地址逆解析
async function getAddress({ longitude, latitude, type, getAddress: customGetAddress }) {
  let result = null
  if (typeof customGetAddress === 'function') {
    result = await customGetAddress({
      longitude,
      latitude,
      type
    })
  } else {
    result = await defaultGetAddress({
      longitude,
      latitude,
      type
    })
  }

  // getAddress failed
  if (typeof result === 'string') {
    return result
  }

  // getAddress success
  const addr = result?.address || ''
  if (addr) {
    result.longitude = longitude
    result.latitude = latitude
    result.address = addr
    if (result?.name) result.name = result?.name
  }
  return result
}

export default getAddress
