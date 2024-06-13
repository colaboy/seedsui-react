// Create bmap,amap,etc map to use invoke api
function createApiMap(container) {
  let apiMap = null

  if (window.BMap) {
    apiMap = new window.BMap.Map(container)
  }

  return apiMap
}

export default createApiMap
