import Toast from './../../../Toast'
import coordTransform from './coordTransform'
import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'
import defaultGetAddress from './defaultGetAddress'

async function mapApiGetAddress({ longitude: lng, latitude: lat, type = 'wgs84' }) {
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
async function getAddress({ longitude, latitude, type = 'wgs84' }) {
  let result = {
    longitude,
    latitude
  }

  result = await mapApiGetAddress({
    longitude,
    latitude,
    type
  })

  // getAddress failed
  if (typeof result === 'string') {
    Toast.show({ content: result })
    return null
  }

  return result
}

export default getAddress
