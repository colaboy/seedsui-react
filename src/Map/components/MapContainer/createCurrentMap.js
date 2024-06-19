// Create bmap,amap,etc map to use invoke api
async function createCurrentMap(container) {
  let currentMap = null

  if (window.BMap) {
    currentMap = new window.BMap.Map(container)
  } else if (window.google) {
    currentMap = new window.google.maps.Map(container, {
      center: new window.google.maps.LatLng(51.508742, -0.12085),
      zoom: 5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    })
  }

  return currentMap
}

export default createCurrentMap
