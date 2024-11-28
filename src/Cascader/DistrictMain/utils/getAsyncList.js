// 获取异步列表
async function getAsyncList(loadList) {
  let list = null
  // 异步加载列表
  if (typeof loadList === 'function') {
    list = await loadList()
  }
  // 默认的全局数据
  else if (window.districtData) {
    list = window.districtData
  }
  return list
}

export default getAsyncList
