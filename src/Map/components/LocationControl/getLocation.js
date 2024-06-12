// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Bridge from './../../../Bridge'
import getAddress from './../../utils/getAddress'

// 获取地址信息
async function _getAddress({ geocoder, type, longitude, latitude }) {
  let result = null
  if (typeof geocoder === 'function') {
    result = await geocoder({
      longitude,
      latitude
    })
  } else {
    result = await getAddress({
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
  const addr = result?.value || result?.address || ''
  if (addr) {
    result.longitude = longitude
    result.latitude = latitude
    result.value = addr
    result.address = addr
  }
  return result
}

// 定位
function getLocation(options) {
  const { type = window.google ? 'wgs84' : 'gcj02', geocoder } = options || {}
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    Bridge.debug = true
    // 开始定位
    Bridge.getLocation({
      type: type,
      success: async (data) => {
        // 已经有位置则不需要再定位
        if (data?.address) {
          resolve({
            longitude,
            latitude,
            address: data.address
          })
          return
        }

        // 没有位置则获取地址
        let result = await _getAddress({
          geocoder: geocoder,
          type: type,
          longitude: data.longitude,
          latitude: data.latitude
        })
        resolve(result)
      },
      fail: (res) => {
        // 赋值
        resolve(locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'))
      }
    })
  })
}

export default getLocation
