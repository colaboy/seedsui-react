// 百度地图图标
function getMarkerIcon(color) {
  let imageUrl = `//res.waiqin365.com/d/seedsui/location/marker-${color}.png`
  let size = new BMap.Size(24, 32)
  return new BMap.Icon(imageUrl, size, {
    size: size,
    imageSize: size,
    imageUrl: imageUrl
  })
}

export default getMarkerIcon
