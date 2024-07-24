import React, { forwardRef, useRef } from 'react'
import { Map } from 'seedsui-react'
const { Icon, MapContainer, ZoomControl, Markers } = Map

function Marker({ points, icon }, ref) {
  // 地图容器
  const mapRef = useRef(null)

  // 放大缩小
  const zoomRef = useRef(null)

  if (!Array.isArray(points) || !points.length) return <div>11111</div>

  return (
    <MapContainer
      // api
      ref={mapRef}
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
            icon: Icon.getIcon(point.icon || icon)
          }
        })}
      />

      {/* 缩放控件 */}
      <ZoomControl ref={zoomRef} style={{ bottom: '105px' }} />
    </MapContainer>
  )
}

export default forwardRef(Marker)
