import React, { forwardRef } from 'react'

// 内库使用
import locale from './../../locale'

// 测试使用
// import { locale } from 'seedsui-react'

// 上传按钮
const Button = ({ ...props }, ref) => {
  return (
    <div ref={ref} className="upload-choose-button" {...props}>
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
    </div>
  )
}

export default forwardRef(Button)
