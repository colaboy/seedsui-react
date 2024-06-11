import locale from './../../../locale'
import GeoUtil from './../../../GeoUtil'

// 百度地址逆解析
function baiduGetAddress({ longitude, latitude }, type) {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    // 转为百度坐标
    let bdPoint = GeoUtil.coordtransform([longitude, latitude], type, 'bd09')
    bdPoint = new BMap.Point(bdPoint[0], bdPoint[1])
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

export default baiduGetAddress
