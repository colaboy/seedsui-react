import gcjToBdPoint from './gcjToBdPoint'
import pointToBdPoint from './pointToBdPoint'
import getMarkerIcon from './getMarkerIcon'

// 添加点
function addMarkers(
  points,
  {
    map,
    type,
    // 标记颜色
    color
  }
) {
  let markers = []
  for (let poi of points) {
    if (type === 'gcj02') {
      poi = gcjToBdPoint(poi)
    } else {
      poi = pointToBdPoint(poi)
    }
    let icon = color ? getMarkerIcon(color) : null
    let marker = new BMap.Marker(poi, { icon: icon })
    map.addOverlay(marker)
    markers.push(marker)
  }
  return markers
}

export default addMarkers
