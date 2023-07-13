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
    color,
    zIndex
  }
) {
  let markers = []
  for (let poi of points) {
    if (type === 'gcj02') {
      poi = gcjToBdPoint(poi)
    } else {
      poi = pointToBdPoint(poi)
    }
    let icon = getMarkerIcon(color)
    let marker = new window.BMap.Marker(poi, { icon: icon })
    if (zIndex) {
      marker.setZIndex(zIndex)
    }
    map.addOverlay(marker)
    markers.push(marker)
  }
  return markers
}

export default addMarkers
