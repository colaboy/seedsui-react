import coordTransform from './../coordTransform'
import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'
import defaultGetAddress from './defaultGetAddress'

// 地址逆解析
async function getAddress({ longitude: lng, latitude: lat }, type) {
  let result = null

  // 坐标转换
  let { longitude, latitude } = coordTransform({ longitude: lng, latitude: lat }, type)

  if (window.google) {
    result = await googleGetAddress({ longitude, latitude })
  } else if (window.BMap) {
    result = await bmapGetAddress({ longitude, latitude })
  } else {
    result = await defaultGetAddress({ longitude, latitude })
  }
  return result
}

export default getAddress
