// Create bmap,amap,etc map to use invoke api
function createCurrentMap(container) {
  let currentMap = null

  if (window.BMap) {
    currentMap = new window.BMap.Map(container)
  }

  return currentMap
}

export default createCurrentMap
