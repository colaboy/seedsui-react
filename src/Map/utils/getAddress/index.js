import coordsToWgs84 from './../coordsToWgs84'
import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'
import defaultGetAddress from './defaultGetAddress'

// 内库使用
import Toast from './../../../Toast'

// 测试使用
// import { Toast } from 'seedsui-react'

// 地址逆解析
async function getAddress(params) {
  // 已存在地址则不需要解析
  if (params?.address) {
    return params
  }

  let result = null

  // 默认优先使用系统级定位
  if (window.getAddressDefault && typeof window.getAddressDefault === 'function') {
    result = await window.getAddressDefault(params)
    return result
  }

  // 坐标转换, 统一使用wgs84获取位置
  let wgs84Coord = coordsToWgs84({
    longitude: params.longitude,
    latitude: params.latitude,
    from: params.type || 'wgs84'
  })

  if (window.google) {
    result = await googleGetAddress(wgs84Coord)
  } else if (window.BMap) {
    result = await bmapGetAddress(wgs84Coord)
  } else {
    result = await defaultGetAddress(wgs84Coord)
  }

  // getAddress failed
  if (typeof result === 'string') {
    Toast.show({ content: result })
    return result
  }

  return {
    ...result,
    ...params
  }
}

export default getAddress
