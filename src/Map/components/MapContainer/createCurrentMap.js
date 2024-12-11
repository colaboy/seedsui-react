import coordsToFit from '../../utils/coordsToFit'
import defaultCountryCenter from './defaultCountryCenter'

// Create bmap,amap,etc map to use invoke api
function createCurrentMap(container, { center } = {}) {
  // center for search feature
  let wgs84Center = null
  // Get the first point if array center
  if (center?.longitude && center?.latitude) {
    wgs84Center = center
  } else if (
    Array.isArray(center) &&
    center.length &&
    center[0]?.longitude &&
    center[0]?.latitude
  ) {
    wgs84Center = {
      longitude: center[0]?.longitude,
      latitude: center[0]?.latitude
    }
  }

  // Map instance
  let currentMap = null

  // Init baidu map
  if (window.BMap) {
    wgs84Center = wgs84Center || defaultCountryCenter['zh_CN']

    let bdPoint = coordsToFit(wgs84Center)

    let bmapCenter = new window.BMap.Point(bdPoint.longitude, bdPoint.latitude)
    currentMap = new window.BMap.Map(container)
    currentMap.centerAndZoom(bmapCenter, 12)

    // 禁用地图拖拽
    currentMap.disableDragging()

    // 禁用地图缩放
    currentMap.disableScrollWheelZoom()
    currentMap.disableDoubleClickZoom()
    currentMap.disablePinchToZoom()
  }
  // Init google map
  else if (window.google) {
    wgs84Center = wgs84Center || defaultCountryCenter['other']
    let googleCenter = new window.google.maps.LatLng(wgs84Center.longitude, wgs84Center.latitude)

    currentMap = new window.google.maps.Map(container, {
      center: googleCenter,
      zoom: 5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    })
  }

  return currentMap
}

export default createCurrentMap
