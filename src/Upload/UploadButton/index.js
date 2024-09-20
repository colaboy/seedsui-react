import React from 'react'

import Button from './Button'

// 上传按钮
const Upload = ({
  // file框属性
  fileProps,

  // 上传DOM和状态
  uploadNode,

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
    <div className={`upload-choose${disabled ? ' disabled' : ''}`} onClick={handleUploadClick}>
      {/* 启用file框 */}
      {onFileChange && (
        <input
          type="file"
          className="upload-choose-file"
          onChange={handleFileChange}
          onClick={(e) => {
            e.stopPropagation()
          }}
          // file框属性, 过滤undefined属性
          {...Object.fromEntries(
            Object.entries(fileProps || {}).filter(([key, value]) => value !== undefined)
          )}
        />
      )}

      {/* 添加图标 */}
      {!uploadNode && <Button disabled={disabled} {...props} />}

      {uploadNode && uploadNode}
    </div>
  )
}

export default Upload
