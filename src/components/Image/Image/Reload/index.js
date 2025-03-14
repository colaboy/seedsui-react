import React from 'react'

// 失败重传图标
const Reload = ({ onReUpload }) => {
  return (
    <div
      className={`image-reload`}
      onClick={(e) => {
        e.stopPropagation()
        // 上传失败允许重新上传
        if (e.currentTarget.parentNode.classList.contains('fail')) {
          onReUpload && onReUpload(e)
        }
      }}
    >
      <div className="image-reload-icon">
        <div className="image-reload-icon-fail"></div>
      </div>
    </div>
  )
}

export default Reload
