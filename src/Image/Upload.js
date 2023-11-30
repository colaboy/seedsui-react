import React from 'react'

// 上传按钮
const Upload = ({
  type,

  // 文件选择框
  isBrowser,

  // 上传DOM和状态
  uploadNode,
  uploading,

  // Events
  onBeforeChoose,
  onChoose
}) => {
  // 判断是否是浏览器上传照片
  // eslint-disable-next-line
  let isBrowserUpload =
    type !== 'video' &&
    (!navigator.userAgent.toLowerCase().match(/applewebkit.*mobile.*/) || isBrowser)

  // 选择文件
  function handleFileChange(e) {
    // 触发选择
    onChoose && onChoose(e)
  }

  // 点击选择框
  async function handleUploadClick(e) {
    let target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    if (typeof onBeforeChoose === 'function') {
      let goOn = await onBeforeChoose()
      if (goOn === false) return
    }

    // 点击的是input框
    if (isBrowserUpload) {
      // 防止选择重复图片时不触发
      let inputDOM = target.querySelector('input')
      inputDOM.value = ''
      inputDOM.click()
      return
    }

    // 触发选择
    onChoose && onChoose(e)
  }

  // 获取Loading
  function getUploadingDOM() {
    if (!uploading) return null
    if (typeof uploading === 'boolean') {
      return (
        <div className="image-upload-loading">
          <div className="image-upload-loading-icon">
            <svg viewBox="25 25 50 50">
              <circle cx="50" cy="50" r="20"></circle>
            </svg>
          </div>
        </div>
      )
    }
    return uploading
  }

  return (
    <div
      className={`image-item image-upload${uploading ? ' uploading' : ''}`}
      onClick={handleUploadClick}
    >
      {/* 拍照或者视频图标 */}
      <div className={`image-upload-icon${type === 'video' ? ' video' : ''}`}></div>
      {/* PC端使用file框 */}
      {isBrowserUpload && (
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
      {getUploadingDOM(uploading)}
    </div>
  )
}

export default Upload
