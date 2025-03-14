import React, { useRef } from 'react'

// 上传按钮
const Upload = ({
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
  // Bridge.chooseImage参数
  let chooseParamsRef = useRef(null)

  // 选择文件
  function handleFileChange(e) {
    onFileChange && onFileChange(e, chooseParamsRef.current)
  }

  // 点击选择框
  async function handleUploadClick(e) {
    // Fix react 16 sync events lost issues
    if (e.persist && typeof e.persist === 'function') e.persist()
    let target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    chooseParamsRef.current = null
    if (typeof onBeforeChoose === 'function') {
      let isOk = await onBeforeChoose(e, {
        setUploading: (isUploading) => {
          debugger
          if (isUploading) {
            e.nativeEvent.target.classList.add('uploading')
          } else {
            e.nativeEvent.target.classList.remove('uploading')
          }
        },
        setChooseParams: (chooseParams) => {
          chooseParamsRef.current = chooseParams
        }
      })
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
    onChoose && onChoose(e, chooseParamsRef.current)
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
      {uploadingNode && uploadingNode}
    </div>
  )
}

export default Upload
