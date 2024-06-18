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
  const addr = result?.address || ''
  if (addr) {
    result.longitude = longitude
    result.latitude = latitude
    result.address = addr
    result.name = result?.name || undefined
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

        let point = [result.longitude, result.latitude]

        // Leaflet only support wgs84
        point = GeoUtil.coordtransform([result.longitude, result.latitude], type, 'wgs84')

        resolve({ ...result, longitude: point[0], latitude: point[1] })
      },
      fail: (res) => {
        // 赋值
        resolve(locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'))
      }
    })
  })
}

export default getLocation
