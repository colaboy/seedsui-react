import React from 'react'
import locale from './../locale'

import Status from './Status'

// 上传按钮
const Upload = ({
  type,

  // file框属性
  fileProps,

  // 上传DOM和状态
  uploadNode,

  // Custom Status
  statusRender,

  // Events
  onBeforeChoose,
  onChoose,
  onFileChange
}) => {
  // 选择文件
  function handleFileChange(e) {
    onFileChange && onFileChange(e)
  }

  // 点击选择框
  async function handleUploadClick(e) {
    let target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    if (typeof onBeforeChoose === 'function') {
      let goOn = await onBeforeChoose(e)
      if (goOn === false) return
    }

    // 点击的是input框
    if (onFileChange) {
      // 防止选择重复图片时不触发
      let inputDOM = target.querySelector('input')
      inputDOM.value = ''
      inputDOM.click()
      return
    }

    // 触发选择
    onChoose && onChoose(e)
  }

  return (
    <div className={`upload-upload`} onClick={handleUploadClick}>
      {/* 启用file框 */}
      {onFileChange && (
        <input
          type="file"
          className="image-upload-file-photo"
          onChange={handleFileChange}
          accept="image/*"
          // 以下的属性值会导致: 部分安卓机会不显示拍照
          // accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
          onClick={(e) => {
            e.stopPropagation()
          }}
          // file框属性
          {...(fileProps || {})}
        />
      )}
      {uploadNode && uploadNode}
      {/* 图标 */}
      <i className={`upload-button-icon-add`}></i>
      {/* 文字 */}
      <div className="upload-button-label">{locale('附件', 'SeedsUI_attach')}</div>
      {/* 状态遮罩 */}
      <Status statusRender={statusRender} />
    </div>
  )
}

export default Upload
