// 添加放大缩小控件
function addZoomControl({ map }) {
  const navigationControl = new BMap.NavigationControl({
    type: window.BMAP_NAVIGATION_CONTROL_ZOOM,
    showZoomInfo: false,
    enableGeolocation: false
  })
  map.addControl(navigationControl)
}

export default addZoomControl
