const defaultMarkerConfig = {
  select: {
    imageUrl: '//res.waiqin365.com/d/seedsui/map/map-shop-point.png',
    size: [44, 50]
  },
  point: {
    imageUrl: '//res.waiqin365.com/d/seedsui/map/map-point.png',
    size: [20, 23]
  }
}

// 百度地图图标
function getMarkerIcon(color, markerConfig) {
  let size = markerConfig?.point?.size || defaultMarkerConfig.point.size
  let imageUrl = markerConfig?.point?.imageUrl || defaultMarkerConfig.point.imageUrl
  if (color === 'select') {
    size = markerConfig?.select?.size || defaultMarkerConfig.select.size
    imageUrl = markerConfig?.select?.imageUrl || defaultMarkerConfig.select.imageUrl
  }

  let iconSize = new window.BMap.Size(size[0], size[1])
  return new window.BMap.Icon(imageUrl, iconSize, {
    size: iconSize,
    imageSize: iconSize,
    imageUrl: imageUrl
  })
}

export default getMarkerIcon
