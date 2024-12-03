import React, { forwardRef } from 'react'
import Preview from './Preview'
import Choose from './Choose'

// 地图标注
const Main = forwardRef(
  (
    {
      config,
      // 类型: preview、choose
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
    if (type === 'preview') {
      return <Preview ref={ref} value={value} {...props} />
    }
    if (type === 'choose') {
      return (
        <Choose
          ref={ref}
          config={config}
          autoLocation={autoLocation}
          getLocation={getLocation}
          getAddress={getAddress}
          value={value}
          onChange={onChange}
          {...props}
        />
      )
    }
    return null
  }
)

export default Main
