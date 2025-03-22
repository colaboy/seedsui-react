import React from 'react'

import Button from './Button'

// 上传按钮
const Upload = ({
  className,
  // file框属性
  fileProps,

  // 上传DOM和状态
  uploadNode,
  uploading,

  // Events
  onBeforeChoose,
  onChoose,
  onFileChange,
  disabled,
  ...props
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

    if (target.classList.contains('disabled')) {
      return
    }

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
    <div
      className={`upload-choose${disabled ? ' disabled' : ''}${className ? ' ' + className : ''}`}
      onClick={handleUploadClick}
    >
      {/* 上传按钮 */}
      <Button disabled={disabled} uploading={uploading} />

      {/* 启用file框 */}
      {onFileChange && (
        <input
          type="file"
          className="upload-choose-input-file"
          onChange={handleFileChange}
          onClick={(e) => {
            e.stopPropagation()
          }}
          {...(fileProps || {})}
        />
      )}

      {/* 上传 */}
      {uploadNode && uploadNode}
    </div>
  )
}

export default Upload
