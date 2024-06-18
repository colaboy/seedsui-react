// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import GeoUtil from './../../../GeoUtil'
import locale from './../../../locale'
import Bridge from './../../../Bridge'

// 定位
function getLocation(options) {
  const { getAddress } = options || {}

  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    Bridge.debug = true
    // 开始定位
    Bridge.getLocation({
      type: 'wgs84',
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
          result = await getAddress({
            longitude: data.longitude,
            latitude: data.latitude
          })
        }

        resolve({ ...result, longitude: result.longitude, latitude: result.latitude })
      },
      fail: (res) => {
        // 赋值
        resolve(locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'))
      }
    })
  })
}

export default getLocation
