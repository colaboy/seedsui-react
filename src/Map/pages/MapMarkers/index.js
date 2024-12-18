import React, { forwardRef } from 'react'

import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import Markers, { createIcon as createMarkerIcon } from './../../components/Markers'

import Result from './../../components/Result'

// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 地图标注
function MapMarkers(
  {
    points: externalPoints,
    icon,
    // 获取定位和地址工具类
    getAddress,
    getLocation,
    queryNearby,

    onMarkerClick,
    onLoad,
    // Control Props
    ZoomControlProps,
    children,
    ...props
  },
  ref
) {
  if (!Array.isArray(externalPoints) || !externalPoints.length) {
    return <Result title={`${locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}points`} />
  }

  let points = externalPoints
  // 百度国内使用bd09
  if (window.BMap) {
    points = coordsToFit(externalPoints, { inChinaTo: 'bd09' })
  }
  // 高德和google国内使用gcj02
  else if (window.AMap || window.google) {
    points = coordsToFit(externalPoints, { inChinaTo: 'gcj02' })
  }

  return (
    <MapContainer
      // api
      ref={ref}
      center={points}
      zoom={14}
      {...props}
      onLoad={(map) => {
        // value没值时，开启自动定位，则先定位
        if (typeof map === 'string') return

        onLoad && onLoad(map)
      }}
      // 自定义获取地址和定位
      getAddress={getAddress}
      getLocation={getLocation}
      queryNearby={queryNearby}
    >
      {/* 标注点 */}
      <Markers
        points={points.map((point) => {
          return {
            ...point,
            icon: createMarkerIcon(point?.icon || icon)
          }
        })}
        onClick={onMarkerClick}
      />

      {/* 缩放控件 */}
      <ZoomControl style={{ bottom: '20px' }} {...ZoomControlProps} />

      {children}
    </MapContainer>
  )
}

export default forwardRef(MapMarkers)
