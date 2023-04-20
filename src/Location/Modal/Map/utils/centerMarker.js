import bdToGcjCoord from './bdToGcjCoord'
import addMarkers from './addMarkers'
import getLocation from './getLocation'

// 绘制中心点
function centerMarker({ map }) {
  // 绘制中心点
  let centerPoint = map.getCenter()
  addMarkers([centerPoint], { map: map, color: 'red', zIndex: 20010086 })

  // 获取地址信息
  return getLocation({ point: bdToGcjCoord(centerPoint) })
}
export default centerMarker
