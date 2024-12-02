import React, { forwardRef } from 'react'
import Preview from './Preview'
import Choose from './Choose'

// 地图标注
const Main = forwardRef(
  (
    {
      config,
      autoLocation = true,
      // 自定义地址逆解析
      geocoder,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value,
      onChange,

      type, // preview、choose

      // 标注配置
      markerConfig,
      // 渲染
      footerRender,

      ...props
    },
    ref
  ) => {
    if (type === 'preview') {
      return (
        <Preview
          ref={ref}
          markerConfig={markerConfig}
          value={value}
          footerRender={footerRender}
          {...props}
        />
      )
    }
    if (type === 'choose') {
      return (
        <Choose
          ref={ref}
          markerConfig={markerConfig}
          autoLocation={autoLocation}
          value={value}
          onChange={onChange}
          geocoder={geocoder}
          footerRender={footerRender}
          {...props}
        />
      )
    }
    return null
  }
)

export default Main
