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

  // 参数不全
  if (!params?.longitude || !params?.latitude || !params?.type) {
    return 'getAddress must pass longitude, latitude and type'
  }

  if (window.google) {
    result = await googleGetAddress(params)
  } else if (window.BMap) {
    result = await bmapGetAddress(params)
  } else {
    result = await defaultGetAddress(params)
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
