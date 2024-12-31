import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import Preview from './Preview'
import Choose from './Choose'

// 地图标注
const Main = forwardRef(
  (
    {
      // 显示类型: preview、choose
      visible,
      allowClear,

      config,
      zoom,
      autoLocation = true,
      getLocation,
      getAddress,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value,
      onChange,

      ...props
    },
    ref
  ) => {
    const mainRef = useRef(null)
    const mapRef = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        ...mapRef.current
      }
    })

    return (
      <div
        {...props}
        className={`map-main${props?.className ? ' ' + props.className : ''}`}
        ref={mainRef}
      >
        <div className="map-main-map">
          {visible === 'preview' && <Preview ref={mapRef} config={config} value={value} />}
          {visible === 'choose' && (
            <Choose
              ref={mapRef}
              config={config}
              zoom={zoom}
              autoLocation={autoLocation}
              getLocation={getLocation}
              getAddress={getAddress}
              value={value}
              onChange={(newValue) => {
                onChange && onChange(newValue)
              }}
            />
          )}
        </div>
      </div>
    )
  }
)

export default Main
