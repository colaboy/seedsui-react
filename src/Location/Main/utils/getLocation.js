// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Bridge from './../../../Bridge'

// 获取地址信息
async function getAddress({ geocoder, longitude, latitude, ...data }) {
  let result = null
  if (typeof geocoder === 'function') {
    result = await geocoder({
      longitude,
      latitude,
      ...data
    })
  } else {
    result = await Bridge.getAddress({
      longitude,
      latitude,
      ...data
    })
  }
  const addr = result && result.address ? result.address : ''
  if (addr) {
    result.longitude = longitude
    result.latitude = latitude
    result.value = addr
  }
  // 没有地址则认为获取地址失败
  else {
    result = null
  }
  return result
}

// 定位
function getLocation(opt) {
  const { geocoder, longitude, latitude, cacheTime, ...data } = opt || {}
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
    // 开始定位
    Bridge.getLocation({
      cacheTime: typeof cacheTime === 'number' ? cacheTime : 10000,
      type: 'gcj02',
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
        resolve(locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed'))
      }
    })
  })
}

export default getLocation
