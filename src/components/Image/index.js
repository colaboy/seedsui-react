import React, { forwardRef } from 'react'

import getUploadType from './getUploadType'
import WeChat from './WeChat'
import WeChatMiniProgram from './WeChatMiniProgram'
import Browser from './Browser'
import QinCe from './QinCe'

// Image upload
function Image(
  {
    timeout,
    // Upload type: wq,browser,weChatMiniProgram,weChat
    uploadType,
    allowClear,
    readOnly,
    reUpload,
    ...props
  },
  ref
) {
  let uploadType = getUploadType(uploadType)

  // 勤策
  if (uploadType === 'wq') {
    return <QinCe timeout={timeout} reUpload={reUpload} {...props} ref={ref} />
  }

  // 微信小程序, 调用小程序页面上传
  if (uploadType === 'weChatMiniProgram') {
    return <WeChatMiniProgram {...props} ref={ref} />
  }

  if (uploadType === 'weChat') {
    return <WeChat reUpload={reUpload} {...props} ref={ref} />
  }

  // file框模式上传: uploadType === 'browser'
  return <Browser {...props} ref={ref} />
}

export default forwardRef(Image)
