import React, { forwardRef, useEffect, useState } from 'react'
import Preview from './Preview'
import Choose from './Choose'
import Error from './Error'

// 测试使用
// import { MapUtil } from 'seedsui-react'
// 内库使用
import MapUtil from './../../MapUtil'

// 地图标注
const Main = forwardRef(
  (
    {
      ak,
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
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      if (window.BMap) {
        setIsLoaded(true)
        return
      }
      if (ak) {
        MapUtil.load({
          ak: ak,
          success: () => {
            setIsLoaded(true)
          },
          fail: () => {
            setIsLoaded('地图库加载失败，请稍后再试！')
          }
        })
      } else {
        setIsLoaded('未加载地图库，请传入ak！')
      }
      // eslint-disable-next-line
    }, [])

    if (isLoaded === true && type === 'preview') {
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
    if (isLoaded === true && type === 'choose') {
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
    if (typeof isLoaded === 'string') {
      return <Error ref={ref} errMsg={isLoaded} {...props} />
    }
    return null
  }
)

export default Main
