import React, { forwardRef, useContext } from 'react'

import coordsToFit from './../../utils/coordsToFit'
import createMarkerIcon from './../../utils/createMarkerIcon'
import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import Markers from './../../components/Markers'
import MapContext from './../../components/MapContext'

// 内库使用-start
import Result from './../../../Result'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Result, LocaleUtil } from 'seedsui-react'
测试使用-start */

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
  const { defaultMarkerIconOptions } = useContext(MapContext)

  if (!Array.isArray(externalPoints) || !externalPoints.length) {
    return (
      <Result
        status="500"
        title={`${LocaleUtil.locale('请传入参数', 'SeedsUI_need_pass_parameter_error')}points`}
      />
    )
  }

  let points = externalPoints

  // 高德和google国内使用gcj02
  if (window.AMap || window.google) {
    points = coordsToFit(externalPoints, { inChinaTo: 'gcj02' })
  }
  // 百度国内使用bd09
  else if (window.BMap) {
    points = coordsToFit(externalPoints, { inChinaTo: 'bd09' })
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
            icon: createMarkerIcon(point?.icon || icon || defaultMarkerIconOptions)
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
