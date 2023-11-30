import React from 'react'

// 状态:choose|uploading|fail|success
const Status = ({ onReUpload }) => {
  return (
    <div
      className={`image-status`}
      onClick={(e) => {
        e.stopPropagation()
        // 上传失败允许重新上传
        if (e.currentTarget.parentNode.classList.contains('fail')) {
          onReUpload && onReUpload(e)
        }
      }}
    >
      <div className="image-status-icon">
        {/* 加载图标 */}
        <svg viewBox="25 25 50 50" className="image-status-icon-loading">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    </div>
  )
}

export default Status
