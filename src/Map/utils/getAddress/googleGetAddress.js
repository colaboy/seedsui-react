// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 地址逆解析
function googleGetAddress({ longitude, latitude }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let latLng = new window.google.maps.LatLng(latitude, longitude)

    // 逆解析
    let geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: latLng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          let result = {}
          result.address = results[0].formatted_address
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
