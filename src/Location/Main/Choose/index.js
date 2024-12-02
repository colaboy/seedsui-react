import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'

// 内库使用
import Map from './../../../Map'

// 测试使用
// import { Map } from 'seedsui-react'

const { APILoader, MapChoose, coordsToWgs84 } = Map

// 地图位置选择
const LocationChoose = forwardRef(
  (
    {
      config,
      readOnly,
      autoLocation,
      value,
      onChange,
      // 渲染
      footerRender
      // ...props
    },
    ref
  ) => {
    // 根节点
    const mapRef = useRef(null)
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.rootDOM,
        getRootDOM: rootRef?.current?.getRootDOM
      }
    })

    console.log('mapRef:', mapRef)
    return (
      <APILoader
        config={config || window.APILoaderConfig}
        onSuccess={() => {
          console.log('地图加载成功')
        }}
        onError={(error) => {
          console.log('地图加载失败', error)
          return (
            <div className="map-result">
              <div className="map-result-title">{error.errMsg}</div>
            </div>
          )
        }}
      >
        <div ref={rootRef} style={{ position: 'relative', width: '100%', height: '500px' }}>
          <MapChoose
            ref={mapRef}
            readOnly={readOnly}
            autoLocation={autoLocation}
            value={coordsToWgs84(value)}
            onChange={(newValue) => {
              console.log('newValue:', newValue)
              onChange && onChange(newValue)
            }}
          />
        </div>
      </APILoader>
    )
  }
)

export default LocationChoose
