import getCenter from './getCenter'

// 绘制中心点
function centerMarker({ map }) {
  return new Promise((resolve) => {
    // 中心点
    let centerPoint = getCenter({ map })

    // 获取地址信息
    // 创建地理编码实例
    let geocoder = new BMap.Geocoder()

    // 根据坐标获取地址信息
    geocoder.getLocation(centerPoint, function (result) {
      let res = {
        ...result,
        value: result.address || '',
        latitude: centerPoint.lat,
        longitude: centerPoint.lng
      }
      resolve(res)
    })
  })
}
export default centerMarker
