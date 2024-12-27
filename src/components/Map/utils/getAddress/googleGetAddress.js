import coordsToFit from './../coordsToFit'

// 内库使用-start
import locale from './../../../../utils/locale'
// 内库使用-end

// 测试使用-start
// import { locale } from 'seedsui-react'
// 测试使用-end

// 地址逆解析
function googleGetAddress(params) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 国内转为gcj02
    let coord = coordsToFit({
      longitude: params.longitude,
      latitude: params.latitude,
      type: params.type,
      inChinaTo: 'gcj02'
    })
    let latLng = new window.google.maps.LatLng(coord.latitude, coord.longitude)

    // 逆解析
    let geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: latLng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          let result = {
            ...params,
            address: results[0].formatted_address
          }
          resolve(result)
        } else {
          resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
        }
      } else {
        resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
      }
    })
  })
}

export default googleGetAddress
