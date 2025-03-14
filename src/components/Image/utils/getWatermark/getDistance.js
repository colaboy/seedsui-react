import { GeoUtil } from 'seedsui-react'

// import Logger from 'library/utils/Logger'

// 获取偏差
function getDistance({ comparePosition, currentPosition }) {
  // 计算偏差
  let distance = null
  if (
    (comparePosition?.longitude && comparePosition?.latitude && currentPosition?.longitude,
    currentPosition?.latitude)
  ) {
    distance = GeoUtil.getDistance(
      [comparePosition.longitude, comparePosition.latitude],
      [currentPosition.longitude, currentPosition.latitude]
    )
    if (typeof distance === 'number' && distance >= 0) {
      distance = Math.abs(distance * 1000).toFixed(0)
    } else {
      distance = null
    }
  }
  return distance
}

export default getDistance
