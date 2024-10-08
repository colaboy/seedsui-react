import React, { forwardRef } from 'react'

// 内库使用
import locale from './../../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

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
    // 获取定位和地址工具类
    getAddress,
    getLocation,
    queryNearby,

    onMarkerClick,
    onLoad,
    onMarkerEnd,
    // Control Props
    ZoomControlProps,
    children,
    ...props
  },
  ref
) {
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
            icon: IconUtil.getIcon(point?.icon || icon)
          }
        })}
        onClick={onMarkerClick}
        onMarkerEnd={onMarkerEnd}
      />

      {/* 缩放控件 */}
      <ZoomControl style={{ bottom: '20px' }} {...ZoomControlProps} />

      {children}
    </MapContainer>
  )
}

export default forwardRef(MapMarkers)
