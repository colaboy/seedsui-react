import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import Thumbnail from './Thumbnail'

// 测试使用
// import { Bridge, Device } from 'seedsui-react'

// 照片视频预览
const Edit = forwardRef(({ value, onDelete }, ref) => {
  const rootRef = useRef(null)
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef?.current,
      getRootDOM: () => {
        return rootRef?.current
      }
    }
  })

  return (
    <div className="signature-edit-container" ref={rootRef}>
      {/* 缩略图 */}
      <Thumbnail src={value} />

      {/* 删除按钮 */}
      {typeof onDelete === 'function' && (
        <div
          className="signature-edit-image-delete"
          onClick={(e) => {
            e.stopPropagation()

            onDelete('')
          }}
        >
          <div className="signature-edit-image-delete-icon"></div>
        </div>
      )}
    </div>
  )
})

export default Edit
