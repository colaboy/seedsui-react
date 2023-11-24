import React from 'react'
import { Bridge } from 'seedsui-react'

// 预览
function Preview({ value, onDelete }) {
  // 图片加载完成
  function handleImgLoad(e) {
    let target = e.target
    target.parentNode.setAttribute('data-complete', '1')
  }
  // 图片加载失败
  function handleImgError(e) {
    let target = e.target
    target.parentNode.setAttribute('data-complete', '0')
  }

  // 未签显示签名
  return (
    <div
      className="photos-item signature-photo"
      style={{ backgroundImage: `url(${value})` }}
      onClick={() => {
        Bridge.previewImage({ urls: [value], current: value })
      }}
    >
      <img
        className="photos-item-img"
        src={value}
        alt=""
        onLoad={handleImgLoad}
        onError={handleImgError}
      />
      <div className="photos-item-error"></div>
      <div className="photos-item-load"></div>
      {/* 删除按钮 */}
      {onDelete && (
        <div
          className="photos-delete"
          onClick={(e) => {
            onDelete?.('')
            e.stopPropagation()
          }}
        >
          <div className="photos-delete-icon"></div>
        </div>
      )}
    </div>
  )
}

export default Preview
