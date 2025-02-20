import React, { forwardRef } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Button from './../../Button'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Button, Loading } from 'seedsui-react'
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
        <Loading.Ouroboros className="upload-button-loading-icon" />
      </div>
      {/* 文字 */}
      <div className="upload-button-label">{LocaleUtil.locale('附件', 'SeedsUI_attach')}</div>
    </Button>
  )
}

export default forwardRef(UploadButton)
