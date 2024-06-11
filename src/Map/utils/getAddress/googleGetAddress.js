import locale from './../../../locale'
import GeoUtil from './../../../GeoUtil'

// 地址逆解析
function googleGetAddress({ longitude, latitude, type }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 转为GPS坐标
    let wgs84Point = GeoUtil.coordtransform([longitude, latitude], type, 'wgs84')
    let latLng = new google.maps.LatLng(wgs84Point[1], wgs84Point[0])

    // 逆解析
    let geocoder = new google.maps.Geocoder()
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
