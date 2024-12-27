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
      readOnly,
      config,
      zoom,
      autoLocation,
      getLocation,
      getAddress,
      value,
      onChange
      // ...props
    },
    ref
  ) => {
    // 根节点
    const mapRef = useRef(null)
    useImperativeHandle(ref, () => {
      return mapRef.current
    })

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
        <MapChoose
          ref={mapRef}
          readOnly={readOnly}
          zoom={zoom}
          autoLocation={autoLocation}
          getLocation={getLocation}
          getAddress={getAddress}
          value={value}
          onChange={(newValue) => {
            console.log('地址选点:', newValue)
            onChange && onChange(newValue)
          }}
        />
      </APILoader>
    )
  }
)

export default LocationChoose
