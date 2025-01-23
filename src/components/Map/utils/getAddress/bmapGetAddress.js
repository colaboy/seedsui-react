import coordsToFit from './../coordsToFit'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 百度地址逆解析
function bmapGetAddress(params) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 国内转为bd09
    let coord = coordsToFit({
      longitude: params.longitude,
      latitude: params.latitude,
      type: params.type,
      inChinaTo: 'bd09'
    })
    let bdPoint = new window.BMap.Point(coord.longitude, coord.latitude)

    // 逆解析
    let geocoder = new window.BMap.Geocoder()
    geocoder.getLocation(bdPoint, (res) => {
      if (!res?.address) {
        resolve(LocaleUtil.locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
        return
      }

      resolve({
        ...params,
        address: res.address
      })
    })
  })
}

export default bmapGetAddress
