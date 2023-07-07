// 添加放大缩小控件(废弃)
function addZoomControl({ map }) {
  const navigationControl = new BMap.NavigationControl({
    type: window.BMAP_NAVIGATION_CONTROL_ZOOM,
    showZoomInfo: false,
    enableGeolocation: false
  })
  map.addControl(navigationControl)
  return navigationControl
}

export default addZoomControl
