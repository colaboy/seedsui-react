import React from 'react'

// 上传按钮
const Choose = ({
  type,

  // file框属性
  fileProps,

  // 上传DOM和状态
  uploadNode,

  // 上传中
  uploadingNode,

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
    // Fix react 16 sync events lost issues
    if (e.persist && typeof e.persist === 'function') e.persist()
    let target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    if (typeof onBeforeChoose === 'function') {
      let isOk = await onBeforeChoose(e)
      if (isOk === false) return
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
    <div className={`image-item image-choose`} onClick={handleUploadClick}>
      {/* 拍照或者视频图标 */}
      <div className={`image-choose-icon${type === 'video' ? ' video' : ''}`}></div>
      {/* 启用file框 */}
      {onFileChange && (
        <input
          type="file"
          className="image-choose-file-photo"
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
      {/* 上传中 */}
      <div className={`image-uploading`}>{uploadingNode && uploadingNode}</div>
    </div>
  )
}

export default Choose
