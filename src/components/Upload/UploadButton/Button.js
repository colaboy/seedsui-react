import React, { forwardRef } from 'react'

// 内库使用-start
import locale from './../../../utils/locale'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { locale, Button } from 'seedsui-react'
测试使用-end */

// 上传按钮
const UploadButton = ({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      className={`upload-choose-button${props?.className ? ' ' + props.className : ''}`}
    >
      <i className={`upload-button-icon-add`}></i>
      {/* Loading图标 */}
      <div className="upload-button-loading">
        <div className="upload-button-loading-icon">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </div>
      {/* 文字 */}
      <div className="upload-button-label">{locale('附件', 'SeedsUI_attach')}</div>
    </Button>
  )
}

export default forwardRef(UploadButton)
