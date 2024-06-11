// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Bridge from './../../../Bridge'
import geocode from './../../utils/getAddress'

// 获取地址信息
async function getAddress({ geocoder, longitude, latitude, ...data }) {
  let result = null
  if (typeof geocoder === 'function') {
    result = await geocoder({
      longitude,
      latitude
    })
  } else if (data?.value || data?.address) {
    let address = data?.value || data?.address
    result = {
      longitude,
      latitude,
      value: address,
      address: address
    }
  } else {
    result = await geocode(
      {
        longitude,
        latitude
      },
      window.google ? 'wgs84' : 'gcj02'
    )
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
function getLocation(opt) {
  const { geocoder, longitude, latitude, ...data } = opt || {}
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 已经有坐标点, 则不需要定位
    if (longitude && latitude) {
      let result = await getAddress({
        geocoder: geocoder,
        longitude,
        latitude,
        ...data
      })
      resolve(result)
      return
    }
    Bridge.debug = true
    // 开始定位
    Bridge.getLocation({
      type: window.google ? 'wgs84' : 'gcj02',
      success: async (data) => {
        let result = await getAddress({
          geocoder: geocoder,
          longitude: data.longitude,
          latitude: data.latitude,
          ...data
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
