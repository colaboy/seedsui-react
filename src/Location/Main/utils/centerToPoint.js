import gcjToBdPoint from './gcjToBdPoint'
import pointToBdPoint from './pointToBdPoint'
import offsetBdPoint from './offsetBdPoint'

// 跳转至中心点
function centerToPoint(point, { map, type }) {
  // 如果是国测局坐标, 需要转百度坐标
  if (type === 'gcj02') {
    // eslint-disable-next-line
    point = gcjToBdPoint(point)
  }

  // eslint-disable-next-line
  point = pointToBdPoint(point)
  map.panTo(
    offsetBdPoint({
      map: map,
      point: point
      // 中心位置偏移
      // offset: {
      //   top: 50
      // }
    })
  )
  // map.setCenter(point)
  // map.setViewport(point)
}
export default centerToPoint
