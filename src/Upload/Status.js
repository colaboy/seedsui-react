import React, { useState } from 'react'

// 状态:choose|uploading|fail|success
const Status = ({ item, onReUpload, statusRender }) => {
  const [statusDOM, setStatusDOM] = useState(null)

  // render icon
  function getStatusIcon() {
    // Custom Status
    let customStatusNode = null
    if (typeof statusRender === 'function') {
      let itemDOM = statusDOM.parentNode

      customStatusNode = statusRender({
        rootDOM: itemDOM.parentNode,
        itemDOM: itemDOM,
        item: item
      })
    }
    if (React.isValidElement(customStatusNode)) {
      return customStatusNode
    }

    // Default Status
    return (
      <div className="attach-upload-loading">
        <div className="attach-upload-loading-icon">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
    )
  }
  return (
    <div
      ref={setStatusDOM}
      className={`upload-status`}
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
