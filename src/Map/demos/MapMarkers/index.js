import React, { useRef, forwardRef } from 'react'
import { Map } from 'seedsui-react'
const { Icon, MapContainer, ZoomControl, Markers } = Map

// 地图标注
function MapMarkers({ points, icon, onMarkerClick }, ref) {
  // 放大缩小
  const zoomRef = useRef(null)

  if (!Array.isArray(points) || !points.length) return <div>11111</div>

  return (
    <MapContainer
      // api
      ref={ref}
      center={points}
      zoom={14}
      // 基准路径
      iconOptions={{
        imagePath: 'https://res.waiqin365.com/d/seedsui/leaflet/images/'
      }}
    >
      {/* 标注点 */}
      <Markers
        points={points.map((point) => {
          return {
            ...point,
            icon: Icon.getIcon(point?.icon || icon)
          }
        })}
        onClick={onMarkerClick}
      />

      {/* 缩放控件 */}
      <ZoomControl ref={zoomRef} style={{ bottom: '20px' }} />
    </MapContainer>
  )
}

export default forwardRef(MapMarkers)
