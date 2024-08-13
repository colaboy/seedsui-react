import React from 'react'

// 测试使用
// import { locale } from 'seedsui-react'

// 内库使用
import locale from './../locale'

// 上传按钮
const Upload = ({
  // file框属性
  fileProps,

  // 上传DOM和状态
  uploadNode,

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
          className="upload-upload-file"
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

      {uploadNode && uploadNode}
    </div>
  )
}

export default Upload
