import gcjToBdPoint from './gcjToBdPoint'
import getMarkerIcon from './getMarkerIcon'

// 添加点
function addMarkers(
  points,
  {
    map,
    type,
    // 标记颜色
    color = 'red'
  }
) {
  let markers = []
  for (let poi of points) {
    if (type === 'gcj02') {
      poi = gcjToBdPoint(poi)
    }
    let marker = new BMap.Marker(poi, { icon: getMarkerIcon(color) })
    map.addOverlay(marker)
    markers.push(marker)
  }
  return markers
}

export default addMarkers
