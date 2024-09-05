import React, { useRef, forwardRef } from 'react'
import locale from './../../../locale'
import IconUtil from './../../utils/IconUtil'
import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import Markers from './../../components/Markers'

import Result from './../../components/Result'

// 地图标注
function MapMarkers(
  {
    points,
    icon,
    onMarkerClick,
    // Control Props
    ZoomControlProps,
    children
  },
  ref
) {
  // 放大缩小
  const zoomRef = useRef(null)

  if (!Array.isArray(points) || !points.length)
    return <Result title={`${locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}points`} />

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
            icon: IconUtil.getIcon(point?.icon || icon)
          }
        })}
        onClick={onMarkerClick}
      />

      {/* 缩放控件 */}
      <ZoomControl ref={zoomRef} style={{ bottom: '20px' }} {...ZoomControlProps} />

      {children}
    </MapContainer>
  )
}

export default forwardRef(MapMarkers)
