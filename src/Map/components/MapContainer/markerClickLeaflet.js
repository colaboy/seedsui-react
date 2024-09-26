// 公共点击leaflet点
function markerClickLeaflet({
  currentPoint,
  points,
  marker,
  markersLayerRef,
  defaultIconRef,
  onClick
}) {
  marker.on('click', function (e) {
    const latitude = e.latlng.lat
    const longitude = e.latlng.lng

    // Get click point
    if (!currentPoint && points) {
      for (let point of points) {
        if (point.longitude === longitude && point.latitude === latitude) {
          // eslint-disable-next-line
          currentPoint = point
        }
      }
    }

    onClick({
      longitude,
      latitude,
      ...(currentPoint || {}),
      icon: e?.target?.options?.icon?.options || null,
      setIcon: (icon, { multiple }) => {
        // Single choice
        if (!multiple) {
          let markers = markersLayerRef.current.getLayers()
          for (let marker of markers) {
            marker.setIcon(defaultIconRef.current)
          }
          e.target.setIcon(icon)
        }
        // Multiple choice
        else {
          e.target.setIcon(icon)
        }
      },
      remove: () => e.target.remove()
    })
  })
}

export default markerClickLeaflet
