import React, { useState } from 'react'

// 内库使用-start
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'seedsui-react'
测试使用-end */

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
        <Loading.Ouroboros className="image-status-icon-loading" />
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
