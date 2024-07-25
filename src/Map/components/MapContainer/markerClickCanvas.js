// 点击canvas绘制的marker
function markerClickCanvas({ canvasMarkerRef, clearMarkers, addMarker }) {
  canvasMarkerRef.current.addOnClickListener((e, data) => {
    let target = data[0]
    const longitude = target.data._latlng.lng
    const latitude = target.data._latlng.lat

    onClick &&
      onClick({
        icon: target?.data?.options?.icon?.options || null,
        setIcon: (icon, { multiple = true }) => {
          // Single choice
          if (!multiple) {
            clearMarkers()
            for (let point of points) {
              addMarker(point, {
                enableCanvas: true,
                icon: point.longitude === longitude && point.latitude === latitude ? icon : null
              })
            }
          }
          // Multiple choice
          else {
            canvasMarkerRef.current.removeMarker(target, true)
            addMarker(
              { longitude: longitude, latitude: latitude },
              { enableCanvas: enableCanvas, icon: icon }
            )
          }
        },
        remove: () => canvasMarkerRef.current.removeMarker(data[0], true),
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      })
  })
}

export default markerClickCanvas
