// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Bridge from './../../../../utils/Bridge'
// 内库使用-end

// 测试使用-start
// import { locale, Bridge } from 'seedsui-react'
// 测试使用-end

// 定位
function getLocation(options) {
  const type = options?.type || 'wgs84'

  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 开始定位
    Bridge.getLocation({
      type: type,
      success: async (data) => {
        let result = data
        resolve(result)
      },
      fail: (error) => {
        console.error(error)
        // 赋值
        resolve(LocaleUtil.text('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'))
      }
    })
  })
}

export default getLocation
