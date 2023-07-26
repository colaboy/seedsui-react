// 测试使用
// import { locale, Bridge } from 'seedsui-react'
// 内库使用
import Bridge from './../../Bridge'
import locale from './../../locale'

// eslint-disable-next-line
export default {
  // 获取定位
  getLocation: function ({ cacheTime, onChange, onError }) {
    // 开始定位
    Bridge.getLocation({
      cacheTime: typeof cacheTime === 'number' ? cacheTime : 10000,
      type: 'gcj02',
      success: async (data) => {
        // 客户端中不需要再getAddress
        if (data.address) {
          // 赋值
          if (onChange) {
            data.value = data.address
            onChange(data)
          }
          return
        }
        let result = await Bridge.getAddress({
          // 只支持gcj02
          latitude: data.latitude,
          longitude: data.longitude
        })
        result = { ...data, ...result }
        const address = result && result.address ? result.address : ''
        result.value = address
        // 没有地址则认为获取地址失败
        if (!address) {
          result = null
        }
        if (onChange) {
          onChange(result)
        }
      },
      fail: (res) => {
        // 赋值
        if (onChange) {
          onChange(null)
        }
        if (onError) {
          onError({
            errMsg: locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed')
          })
        }
      }
    })
  }
}
