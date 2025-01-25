import React from 'react'

// 内库使用-start
import Bridge from './../../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'seedsui-react'
测试使用-end */

// 预览
function Thumbnail({ src }) {
  // 图片加载完成
  function handleImgLoad(e) {
    e.currentTarget.parentNode.classList.add('success')
    e.currentTarget.parentNode.style.backgroundImage = `url(${src})`
  }
  // 图片加载失败
  function handleImgError(e) {
    e.currentTarget.parentNode.classList.add('error')
  }

  // 未签显示签名
  return (
    <div
      className="signature-edit-image"
      onClick={() => {
        Bridge.previewImage({ urls: [src], current: src })
      }}
    >
      <img src={src} alt="" onLoad={handleImgLoad} onError={handleImgError} />
    </div>
  )
}

export default Thumbnail
