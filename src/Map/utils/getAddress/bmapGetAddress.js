// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 百度地址逆解析
function bmapGetAddress({ longitude, latitude }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let bdPoint = new window.BMap.Point(longitude, latitude)
    // 逆解析
    let geocoder = new window.BMap.Geocoder()
    geocoder.getLocation(bdPoint, (res) => {
      let result = {}
      if (!res.address) {
        resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
        return
      }

      result.address = res.address
      resolve(result)
    })
  })
}

export default bmapGetAddress
