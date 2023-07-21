import formatPoint from './formatPoint'
import gcjToBdPoint from './gcjToBdPoint'
import pointToBdPoint from './pointToBdPoint'

// 搜索附近, keyword:搜索关键词
function searchNearby(
  keyword,
  {
    map,
    type,
    point,
    // 搜索半径
    radius = 1000
  }
) {
  return new Promise((resolve) => {
    // 创建本地搜索对象
    let local = new window.BMap.LocalSearch(map, {
      pageCapacity: 100,
      onSearchComplete: function (results) {
        if (local.getStatus() === window.BMAP_STATUS_SUCCESS) {
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

    // 传入点: 经过实验，百度地图searchNearby只根据当前显示的区域搜索，传point没有任何变化（所以不要传，传了也白传）
    if (point) {
      // eslint-disable-next-line
      point = formatPoint(point)
      if (type === 'gcj02') {
        // eslint-disable-next-line
        point = gcjToBdPoint(point)
      } else {
        // eslint-disable-next-line
        point = pointToBdPoint(point)
      }
    }

    // 如果没有传入点, 则默认取中心点
    if (!point) {
      // eslint-disable-next-line
      point = map.getCenter() // 搜索中心点坐标
    }

    local.searchNearby(keyword, point, radius)
  })
}

export default searchNearby
