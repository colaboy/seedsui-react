// 内库使用
import Toast from './../../../Toast'

// 测试使用
// import { Toast } from 'seedsui-react'

import coordTransform from './coordTransform'
import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'
import defaultGetAddress from './defaultGetAddress'

async function mapApiGetAddress({ longitude: lng, latitude: lat, type = 'wgs84' }) {
  let result = null

  // 默认优先使用系统级定位
  if (window.getAddressDefault && typeof window.getAddressDefault === 'function') {
    result = await window.getAddressDefault({ longitude: lng, latitude: lat, type: type })
    return result
  }

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
async function getAddress(options) {
  const { longitude, latitude, type = 'wgs84' } = options || {}

  // 已存在地址则不需要解析
  if (options?.address) {
    return options
  }

  let result = await mapApiGetAddress({
    longitude,
    latitude,
    type
  })

  // getAddress failed
  if (typeof result === 'string') {
    Toast.show({ content: result })
    return result
  }

  return {
    longitude,
    latitude,
    type,
    ...result
  }
}

export default getAddress
