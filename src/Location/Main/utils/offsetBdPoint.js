// 偏移获取的点
function offsetBdPoint({
  map,
  point,
  offset = {
    top: -70
  }
}) {
  if (typeof offset?.top !== 'number') {
    return point
  }

  // 将地图中心点的经纬度转换为像素坐标
  let pixel = map.pointToPixel(point)

  // 设置偏移量
  let size = new BMap.Size(0, offset.top)

  // 根据偏移量计算新的像素坐标
  let newPixel = new BMap.Pixel(pixel.x + size.width, pixel.y + size.height)

  // 将新的像素坐标转换为地理位置
  let newPosition = map.pixelToPoint(newPixel)

  return newPosition
}

export default offsetBdPoint
