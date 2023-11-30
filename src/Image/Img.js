import React from 'react'
import Bridge from './../Bridge'

// 图片显示
const Img = ({ src }) => {
  // 图片加载完成
  function handleImgLoad(e) {
    e.currentTarget.parentNode.classList.add('success')
    e.currentTarget.parentNode.style.backgroundImage = `url(${src})`
  }
  // 图片加载失败
  function handleImgError(e) {
    e.currentTarget.parentNode.classList.add('error')
  }

  return (
    <div className={`image-item-img`}>
      <img src={src} alt="" onLoad={handleImgLoad} onError={handleImgError} />
    </div>
  )
}

export default Img
