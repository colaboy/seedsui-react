import offsetBdPoint from './offsetBdPoint'

// 获取带偏移量的中心点
function getCenter({
  map,
  // 中心位置偏移
  offset = {
    // top: -50
  }
}) {
  // 获取地图中心点
  let center = map.getCenter()
  return offsetBdPoint({ map: map, point: center, offset: offset })
}

export default getCenter
