// 点击canvas绘制的marker
function markerClickCanvas({ points, layerGroup, clearMarkers, defaultIcon, onClick }) {
  layerGroup.addOnClickListener((e, data) => {
    let target = data[0]
    const longitude = target.data._latlng.lng
    const latitude = target.data._latlng.lat

    // Get click point
    let currentPoint = null
    for (let point of points) {
      if (point.longitude === longitude && point.latitude === latitude) {
        // eslint-disable-next-line
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
              let newIcon = point?.icon || defaultIcon
              if (point.latitude === latitude && point.longitude === longitude) {
                newIcon = icon
              }
              let marker = window.L.marker([point.latitude, point.longitude], {
                icon: newIcon
              })

              layerGroup.addMarker(marker)
            }
          }
          // Multiple choice
          else {
            layerGroup.removeMarker(target, true)
            let marker = window.L.marker([latitude, longitude], {
              icon: icon
            })
            layerGroup.addMarker(marker)
          }
        },
        remove: () => layerGroup.removeMarker(data[0], true)
      })
  })
}

export default markerClickCanvas
