import locale from './../../../locale'

// 百度地址逆解析
function bmapGetAddress({ longitude, latitude }) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let bdPoint = new BMap.Point(longitude, latitude)
    // 逆解析
    let geocoder = new BMap.Geocoder()
    geocoder.getLocation(bdPoint, (res) => {
      let result = {}

      if (res.address) {
        result.address = res.address
      }

      if (res.addressComponents) {
        result.province = res.addressComponents.province
        result.city = res.addressComponents.city
        result.district = res.addressComponents.district
      } else {
        resolve(locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed'))
        return
      }
      resolve(result)
    })
  })
}

export default bmapGetAddress
