import React, { forwardRef } from 'react'

// 状态:choose|uploading|fail|success
const Status = (
  {
    visible,
    type,
    // 重新上传
    onReUpload,
    ...props
  },
  ref
) => {
  if (!type) return null
  if (visible === false) return null
  return (
    <div
      ref={ref}
      onClick={type === 'fail' ? onReUpload : undefined}
      {...props}
      className={`photos-status ${type || ''}${props?.className ? ' ' + props.className : ''}`}
    >
      <div className="photos-status-icon">
        {/* 加载图标 */}
        <svg viewBox="25 25 50 50" className="photos-status-icon-loading">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    </div>
  )
}

export default forwardRef(Status)
