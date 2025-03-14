import React, { forwardRef } from 'react'

// import getUploadType from './getUploadType'
// import WeChat from './WeChat'
// import QinCe from './QinCe'
import Browser from './Browser'

// Image upload
function Image(
  {
    // Style
    allowClear = true,
    uploadPosition,
    uploadNode,
    uploading,

    // Config
    async = false,
    reUpload = true,
    count = 5,
    sourceType = ['album', 'camera'],
    list = [], // [{thumb: '全路径', src: '全路径', path: '目录/年月/照片名.jpg', status: 'choose|uploading|fail|success', children: node}]

    // Events
    onBeforeChoose,
    onChoose,
    onUpload,
    onChange,
    onPreview,
    ...props
  },
  ref
) {
  // let uploadType = getUploadType(externalUploadType)

  // // 勤策
  // if (uploadType === 'wq') {
  //   return <QinCe timeout={timeout} reUpload={reUpload} {...props} ref={ref} />
  // }

  // // 微信小程序, 调用小程序页面上传
  // if (uploadType === 'weChatMiniProgram') {
  //   return <WeChatMiniProgram {...props} ref={ref} />
  // }

  // if (uploadType === 'weChat') {
  //   return <WeChat reUpload={reUpload} {...props} ref={ref} />
  // }

  // file框模式上传: uploadType === 'browser'
  return (
    <Browser
      ref={ref}
      // Style
      allowClear={allowClear}
      uploadPosition={uploadPosition}
      uploadNode={uploadNode}
      uploading={uploading}
      // Config
      async={async}
      reUpload={reUpload}
      count={count}
      sourceType={sourceType}
      list={list}
      // Events
      onBeforeChoose={onBeforeChoose}
      onChoose={onChoose}
      onUpload={onUpload}
      onChange={onChange}
      onPreview={onPreview}
      {...props}
    />
  )
}

export default forwardRef(Image)
