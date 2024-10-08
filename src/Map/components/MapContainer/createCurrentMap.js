// 内库使用
import GeoUtil from './../../../GeoUtil'

// 测试使用
// import { GeoUtil } from 'seedsui-react'

// Create bmap,amap,etc map to use invoke api
async function createCurrentMap(container, { center } = {}) {
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
    wgs84Center = wgs84Center || { longitude: 116.39120737493609, latitude: 39.907783490367706 }
    let bdPoint = GeoUtil.coordtransform(
      [wgs84Center.longitude, wgs84Center.latitude],
      'wgs84',
      'bd09'
    )
    let bmapCenter = new window.BMap.Point(bdPoint[0], bdPoint[1])
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
    wgs84Center = wgs84Center || { longitude: 51.508742, latitude: -0.12085 }
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
