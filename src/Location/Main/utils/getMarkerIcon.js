// 百度地图图标
function getMarkerIcon(color) {
  let imageUrl = `//res.waiqin365.com/d/seedsui/map/map-point.png`
  if (color === 'select') {
    imageUrl = `//res.waiqin365.com/d/seedsui/map/map-select-point.png`
  }

  let size = new window.BMap.Size(24, 27)
  return new window.BMap.Icon(imageUrl, size, {
    size: size,
    imageSize: size,
    imageUrl: imageUrl
  })
}

export default getMarkerIcon
