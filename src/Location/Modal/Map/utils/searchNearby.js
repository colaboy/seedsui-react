// 搜索附近, keyword:搜索关键词
function searchNearby(
  keyword,
  {
    map,
    // 搜索半径
    radius = 300
  }
) {
  return new Promise((resolve) => {
    // 创建本地搜索对象
    let local = new BMap.LocalSearch(map, {
      pageCapacity: 20,
      onSearchComplete: function (results) {
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          let res = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            let item = results.getPoi(i)
            // 补充value,latitude,longitude
            item.value = item?.address || ''
            item.longitude = item?.point?.lng || ''
            item.latitude = item?.point?.lat || ''
            res.push(item)
          }
          resolve(res)
        } else {
          resolve(null)
        }
      }
    })

    let point = map.getCenter() // 搜索中心点坐标

    local.searchNearby(keyword, point, radius)
  })
}

export default searchNearby
