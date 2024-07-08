import React, { useState } from 'react'

// 状态:choose|uploading|fail|success
const Status = ({ onReUpload, statusRender }) => {
  const [statusDOM, setStatusDOM] = useState(null)

  // render icon
  function getStatusIcon() {
    // Custom Status
    let customStatusNode = null
    if (typeof statusRender === 'function') {
      let itemDOM = statusDOM.parentNode
      let itemType = 'image'
      if (itemDOM.classList.contains('image-upload')) {
        itemType = 'upload'
      }

      customStatusNode = statusRender({
        rootDOM: itemDOM.parentNode,
        itemDOM: itemDOM,
        itemType: itemType
      })
    }
    if (React.isValidElement(customStatusNode)) {
      return customStatusNode
    }

    // Default Status
    return (
      <div className="image-status-icon">
        {/* 失败图标 */}
        <div className="image-status-icon-fail"></div>
        {/* 加载图标 */}
        <svg viewBox="25 25 50 50" className="image-status-icon-loading">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    )
  }
  return (
    <div
      ref={setStatusDOM}
      className={`image-status`}
      onClick={(e) => {
        e.stopPropagation()
        // 上传失败允许重新上传
        if (e.currentTarget.parentNode.classList.contains('fail')) {
          onReUpload && onReUpload(e)
        }
      }}
    >
      {statusDOM && getStatusIcon()}
    </div>
  )
}

export default Status
