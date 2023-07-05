// 搜索附近, keyword:搜索关键词
function search(keyword, { map }) {
  return new Promise((resolve) => {
    // 创建本地搜索对象
    let local = new BMap.LocalSearch(map, {
      pageCapacity: 20,
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() === BMAP_STATUS_SUCCESS) {
          let res = []
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            const item = results.getPoi(i)
            res.push({
              id: item.uid,
              title: item.title,
              address: item.address,
              point: item.point,
              tel: item.phoneNumber,
              mobile: item.phoneNumber,
              city: item.city,
              province: item.province,
              postcode: item.postcode,
              isAccurate: item.isAccurate,
              tags: item.tags
            })
          }
          resolve(res)
        } else {
          resolve(locale('查询失败'))
        }
      }
    })

    local.search(keyword)
  })
}

export default search
