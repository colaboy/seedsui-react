// Get map render type
function getMapType() {
  if (window.BMap) {
    return 'bmap'
  }
  if (window.google) {
    return 'google'
  }
  if (window.AMap) {
    return 'amap'
  }

  // No third-party map are used, only load leaflet, leaflet use open osm render
  if (window.leaflet) {
    return 'osm'
  }
  return ''
}

export default getMapType
