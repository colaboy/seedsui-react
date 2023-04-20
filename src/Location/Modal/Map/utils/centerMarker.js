import bdToGcjCoord from './bdToGcjCoord'
import getLocation from './getLocation'

// 绘制中心点
function centerMarker({ map }) {
  // 绘制中心点
  let centerPoint = map.getCenter()

  // 获取地址信息
  return getLocation({ point: bdToGcjCoord(centerPoint) })
}
export default centerMarker
