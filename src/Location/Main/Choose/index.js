import React, { forwardRef, useImperativeHandle, useRef } from 'react'

// 内库使用
import Map from './../../../Map'

// 测试使用
// import { Map } from 'seedsui-react'

const { APILoader, MapChoose } = Map

// 地图位置选择
const LocationChoose = forwardRef(
  (
    {
      config,
      readOnly,
      autoLocation,
      getLocation,
      getAddress,
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
    useImperativeHandle(ref, () => {
      return mapRef.current
    })

    console.log('config:', value, config, window.APILoaderConfig)
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
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          <MapChoose
            ref={mapRef}
            readOnly={readOnly}
            autoLocation={autoLocation}
            getLocation={getLocation}
            getAddress={getAddress}
            value={value}
            onChange={(newValue) => {
              console.log('修改:', newValue)
              debugger
              onChange && onChange(newValue)
            }}
          />
        </div>
      </APILoader>
    )
  }
)

export default LocationChoose
