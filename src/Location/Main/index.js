import React, { forwardRef, useEffect, useState } from 'react'
import MapUtil from './../../MapUtil'

import Preview from './Preview'
import Choose from './Choose'
import Error from './Error'

// 地图标注
const Main = forwardRef(
  (
    {
      ak,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value,
      onChange,

      type, // preview、choose

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
    })

    if (isLoaded === true && type === 'preview') {
      return <Preview ak={ak} value={value} footerRender={footerRender} {...props} />
    }
    if (isLoaded === true && type === 'choose') {
      return (
        <Choose
          ref={ref}
          value={value}
          onChange={onChange}
          footerRender={footerRender}
          {...props}
        />
      )
    }
    if (typeof isLoaded === 'string') {
      return <Error ref={ref} errMsg={isLoaded} {...props} />
    }
  }
)

export default Main
