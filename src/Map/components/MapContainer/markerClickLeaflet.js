// 公共点击leaflet点
function markerClickLeaflet({ marker, markersLayerRef, defaultIconRef, onClick }) {
  marker.on('click', function (e) {
    onClick({
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
      remove: () => e.target.remove(),
      latitude: e.latlng.lat,
      longitude: e.latlng.lng
    })
  })
}

export default markerClickLeaflet
