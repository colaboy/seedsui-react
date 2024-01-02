// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Bridge from './../../../Bridge'

// 获取地址信息
async function getAddress({ geocoder, point, onChange }) {
  let result = null
  if (typeof geocoder === 'function') {
    result = await geocoder({
      longitude: point[0],
      latitude: point[1]
    })
  } else {
    result = await Bridge.getAddress({
      longitude: point[0],
      latitude: point[1]
    })
  }
  const address = result && result.address ? result.address : ''
  result.value = address
  // 没有地址则认为获取地址失败
  if (!address) {
    result = null
  }
  if (onChange) {
    onChange(result)
  }
}

// 定位
function getLocation(opt) {
  const { geocoder, point, cacheTime } = opt || {}
  return new Promise((resolve) => {
    // 已经有坐标点, 则不需要定位
    if (Array.isArray(point) && point.length === 2) {
      getAddress({
        geocoder: geocoder,
        point: point,
        onChange: (result) => {
          resolve({
            ...result,
            longitude: point[0],
            latitude: point[1]
          })
        }
      })
      return
    }
    // 开始定位
    Bridge.getLocation({
      cacheTime: typeof cacheTime === 'number' ? cacheTime : 10000,
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          data.value = data.address
          resolve(data)
          return
        }
        getAddress({
          geocoder: geocoder,
          point: [data.longitude, data.latitude],
          onChange: (result) => {
            // eslint-disable-next-line
            result = { ...data, ...result }
            resolve(result)
          }
        })
      },
      fail: (res) => {
        // 赋值
        resolve(locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed'))
      }
    })
  })
}

export default getLocation
