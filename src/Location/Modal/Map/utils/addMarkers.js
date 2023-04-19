// 搜索附近, keyword:搜索关键词
function searchNearby({
  markers,
  map,
  // 搜索半径
  onClick
}) {
  for (let i = 0; i < markers; i++) {
    let poi = markers[i].point
    let marker = new BMap.Marker(poi)
    marker.addEventListener('click', function () {
      onClick && onClick(markers[i])
    })
    map.addOverlay(marker)
  }
}
