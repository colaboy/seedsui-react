import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import Uploading from './../Uploading'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

// 上传按钮
const UploadButton = ({ uploading, ...props }, ref) => {
  const rootRef = useRef(null)

  // Expose
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current
    }
  })

  return (
    <div
      ref={rootRef}
      {...props}
      className={`upload-choose-button${props?.className ? ' ' + props.className : ''}`}
    >
      <i className={`upload-choose-icon upload-choose-icon-add`}></i>

      {/* Loading图标 */}
      <Uploading uploading={uploading} className="upload-choose-icon" />

      {/* 文字 */}
      <div className="upload-choose-button-label">
        {LocaleUtil.locale('附件', 'SeedsUI_attach')}
      </div>
    </div>
  )
}

export default forwardRef(UploadButton)
