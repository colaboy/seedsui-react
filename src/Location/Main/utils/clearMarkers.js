// 清除点
function clearMarkers(markers, { map }) {
  if (Array.isArray(markers) && markers.length) {
    for (let marker of markers) {
      map.removeOverlay(marker)
    }
    return
  }
  // 清除所有overlays, 此方法慎用, 经常会与鼠标事件冲突
  map.clearOverlays()
}

export default clearMarkers
