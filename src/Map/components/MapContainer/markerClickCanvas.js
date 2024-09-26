// 点击canvas绘制的marker
function markerClickCanvas({ points, canvasMarkerRef, clearMarkers, addMarker, onClick }) {
  canvasMarkerRef.current.addOnClickListener((e, data) => {
    let target = data[0]
    const longitude = target.data._latlng.lng
    const latitude = target.data._latlng.lat

    // Get click point
    let currentPoint = null
    for (let point of points) {
      if (point.longitude === longitude && point.latitude === latitude) {
        currentPoint = point
      }
    }

    onClick &&
      onClick({
        longitude,
        latitude,
        ...(currentPoint || {}),
        icon: target?.data?.options?.icon?.options || null,
        setIcon: (icon, { multiple = true }) => {
          // Single choice
          if (!multiple) {
            clearMarkers()
            for (let point of points) {
              addMarker(
                {
                  longitude: point.longitude,
                  latitude: point.latitude,
                  icon: point.longitude === longitude && point.latitude === latitude ? icon : null
                },
                {
                  enableCanvas: true
                }
              )
            }
          }
          // Multiple choice
          else {
            canvasMarkerRef.current.removeMarker(target, true)
            addMarker(
              {
                longitude: longitude,
                latitude: latitude,
                icon: icon
              },
              { enableCanvas: true }
            )
          }
        },
        remove: () => canvasMarkerRef.current.removeMarker(data[0], true)
      })
  })
}

export default markerClickCanvas
