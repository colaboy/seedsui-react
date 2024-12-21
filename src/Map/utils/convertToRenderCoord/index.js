import coordsToFit from './../coordsToFit'

// 转换成用于渲染的点
function convertToRenderCoord(coord) {
  // 参数不合法
  if (!coord?.longitude || !coord?.latitude || !coord?.type) {
    return coord
  }

  let renderCoord = coord
  // 百度国内使用bd09
  if (window.BMap) {
    renderCoord = coordsToFit(coord, { inChinaTo: 'bd09' })
  }
  // 高德和google国内使用gcj02
  else if (window.AMap || window.google) {
    renderCoord = coordsToFit(coord, { inChinaTo: 'gcj02' })
  }
  return renderCoord
}

export default convertToRenderCoord
