// 搜索附近, keyword:搜索关键词
function searchNearby({
  keyword,
  map,
  // 搜索半径
  radius = 1000
}) {
  return new Promise((resolve) => {
    // 创建本地搜索对象
    let local = new BMap.LocalSearch(map, {
      renderOptions: { map: map, panel: 'results' }
    })

    let location = map.getCenter() // 搜索中心点坐标

    local.searchNearby(keyword, location, radius, {
      onSearchComplete: function (results) {
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          resolve(results)
          // for (let i = 0; i < results.length; i++) {
          //   let poi = results[i].point
          //   let marker = new BMap.Marker(poi)
          //   marker.addEventListener('click', function () {
          //     infoWindow.setContent(results[i].title)
          //     this.openInfoWindow(infoWindow)
          //   })
          //   map.addOverlay(marker)
          // }
        } else {
          resolve(null)
        }
      }
    })
  })
}
