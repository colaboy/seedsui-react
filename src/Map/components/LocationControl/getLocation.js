// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import GeoUtil from './../../../GeoUtil'
import locale from './../../../locale'
import Bridge from './../../../Bridge'
import getAddress from './../../utils/getAddress'

// 获取地址信息
async function _getAddress({ geocoder, type, longitude, latitude }) {
  let result = null
  if (typeof geocoder === 'function') {
    result = await geocoder({
      longitude,
      latitude,
      type
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
  const { type = window.BMap || window.AMap ? 'gcj02' : 'wgs84', geocoder } = options || {}
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    Bridge.debug = true
    // 开始定位
    Bridge.getLocation({
      type: type,
      success: async (data) => {
        let result = null
        // 已经有位置则不需要再定位
        if (data?.address) {
          result = {
            longitude: data.longitude,
            latitude: data.latitude,
            address: data.address
          }
          return
        }
        // 没有位置则获取地址
        else {
          result = await _getAddress({
            geocoder: geocoder,
            type: type,
            longitude: data.longitude,
            latitude: data.latitude
          })
        }

        //  longitude and latitude must be wgs84
        let wgs84Point = GeoUtil.coordtransform([result.longitude, result.latitude], type, 'wgs84')

        resolve({ ...result, longitude: wgs84Point[0], latitude: wgs84Point[1] })
      },
      fail: (res) => {
        // 赋值
        resolve(locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'))
      }
    })
  })
}

export default getLocation
