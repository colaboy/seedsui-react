// 公共点击leaflet点
function markerClickLeaflet({ points, layerGroup, clearMarkers, defaultIcon, onClick }) {
  // Must only one layer
  layerGroup.eachLayer(function (layer) {
    layer.on('click', function (e) {
      const latitude = e.latlng.lat
      const longitude = e.latlng.lng

      // Get click point
      let currentPoint = null
      for (let point of points) {
        if (point.longitude === longitude && point.latitude === latitude) {
          // eslint-disable-next-line
          currentPoint = point
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
            clearMarkers()
            for (let point of points) {
              let newIcon = point?.icon || defaultIcon
              if (point.latitude === latitude && point.longitude === longitude) {
                newIcon = icon
              }
              let marker = window.L.marker([point.latitude, point.longitude], {
                icon: newIcon
              })
              marker.addTo(layerGroup)
            }

            // Rebind click
            markerClickLeaflet({
              points,
              clearMarkers,
              layerGroup,
              defaultIcon,
              onClick
            })
          }
          // Multiple choice
          else {
            e.target.setIcon(icon)
          }
        },
        remove: () => e.target.remove()
      })
    })
  })
}

export default markerClickLeaflet
