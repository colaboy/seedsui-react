// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import locale from './../../../locale'
import Bridge from './../../../Bridge'
import defaultGetAddress from './../getAddress'

// 定位
function getLocation({ getAddress } = options || {}) {
  if (typeof getAddress !== 'function') {
    getAddress = defaultGetAddress
  }

  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 开始定位
    Bridge.getLocation({
      type: 'wgs84',
      success: async (data) => {
        let result = {
          longitude: data.longitude,
          latitude: data.latitude,
          address: data?.address,
          data: data?.data
        }

        // 没有位置则获取地址
        if (!data?.address && getAddress) {
          let address = await getAddress({
            longitude: data.longitude,
            latitude: data.latitude
          })
          result = {
            ...result,
            ...address
          }
        }

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
