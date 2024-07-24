import React, { forwardRef, useRef } from 'react'
import { Map } from 'seedsui-react'
const { MapContainer, ZoomControl, Markers } = Map

function Main(
  {
    points,
    icon = window.L.icon({
      active: true,
      iconUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-custom-shop.png`,
      iconRetinaUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-custom-shop.png`,
      shadowUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
      shadowRetinaUrl: `//res.waiqin365.com/d/seedsui/leaflet/images/marker-shadow.png`,
      shadowSize: [39, 39],
      iconSize: [30, 49],
      iconAnchor: [15, 25]
    })
  },
  ref
) {
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
            icon: icon,
            ...point
          }
        })}
      />

      {/* 缩放控件 */}
      <ZoomControl ref={zoomRef} style={{ bottom: '105px' }} />
    </MapContainer>
  )
}

export default forwardRef(Main)
