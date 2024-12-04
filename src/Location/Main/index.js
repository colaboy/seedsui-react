import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import _ from 'lodash'

import Preview from './Preview'
import Choose from './Choose'

// 内库使用
import Map from './../../Map'

// 测试使用
// import { Map } from 'seedsui-react'

const { coordsToWgs84, wgs84ToCoords } = Map

// 地图标注
const Main = forwardRef(
  (
    {
      // 显示类型: preview、choose
      visible,
      allowClear,

      config,
      type,
      autoLocation = true,
      getLocation,
      getAddress,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value,
      onChange,

      // 渲染
      footerRender,

      ...props
    },
    ref
  ) => {
    const mainRef = useRef(null)
    const mapRef = useRef(null)

    if (!_.isEmpty(value)) {
      // eslint-disable-next-line
      value = coordsToWgs84(value, type)
    }

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
        {visible === 'preview' && <Preview ref={mapRef} config={config} value={value} />}
        {visible === 'choose' && (
          <Choose
            ref={mapRef}
            config={config}
            autoLocation={autoLocation}
            getLocation={getLocation}
            getAddress={getAddress}
            value={value}
            onChange={(newValue) => {
              if (!_.isEmpty(newValue)) {
                // eslint-disable-next-line
                newValue = wgs84ToCoords(newValue, type)
              }
              onChange && onChange(newValue)
            }}
          />
        )}
        {footerRender && footerRender()}
      </div>
    )
  }
)

export default Main
