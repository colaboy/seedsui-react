import React, { useState, useEffect } from 'react'

// 内库使用-start
import AssetUtil from './../../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil } from 'seedsui-react'
测试使用-end */

// 图片显示
const Img = ({ src }) => {
  const [backgroundImage, setBackGroundImage] = useState('')

  useEffect(() => {
    setBackGroundImage('')
    AssetUtil.loadImage(src, {
      success: () => {
        setBackGroundImage(src)
      },
      fail: () => {
        setBackGroundImage('error')
      }
    })
  }, [src])

  return (
    <div
      className={`image-item-img${backgroundImage === 'error' ? ' error' : ''}`}
      style={{ backgroundImage: backgroundImage === 'error' ? '' : `url(${backgroundImage})` }}
    ></div>
  )
}

export default Img
