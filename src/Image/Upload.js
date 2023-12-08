import React from 'react'
import Status from './Status'

// 上传按钮
const Upload = ({
  type,

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
    <div className={`image-item image-upload`} onClick={handleUploadClick}>
      {/* 拍照或者视频图标 */}
      <div className={`image-upload-icon${type === 'video' ? ' video' : ''}`}></div>
      {/* 启用file框 */}
      {onFileChange && (
        <input
          type="file"
          className="image-upload-file-photo"
          name="uploadPhoto"
          onChange={handleFileChange}
          accept="image/*"
          // 以下的属性值会导致: 部分安卓机会不显示拍照
          // accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      )}
      {uploadNode && uploadNode}
      {/* 状态遮罩 */}
      <Status statusRender={statusRender} />
    </div>
  )
}

export default Upload
