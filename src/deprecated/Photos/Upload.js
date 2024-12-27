import React from 'react'
import Bridge from './../../utils/Bridge'

// 上传按钮
const Upload = ({
  type,
  // 文件选择框
  isBrowser,
  fileRef,
  inputProps,
  onFileChange,
  // 上传DOM和状态
  upload,
  uploading
}) => {
  // 获取Loading
  function getUploadingDOM() {
    if (!uploading) return null
    if (typeof uploading === 'boolean') {
      return (
        <div className="photos-upload-loading">
          <div className="photos-upload-loading-icon">
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
    <div className={`photos-item photos-upload${uploading ? ' uploading' : ''}`}>
      {/* 拍照或者视频图标 */}
      <div className={`photos-upload-icon${type === 'video' ? ' video' : ''}`}></div>
      {/* 录相 */}
      {type === 'video' && Bridge.platform !== 'wq' && Bridge.platform !== 'waiqin' && (
        <input
          ref={fileRef}
          type="file"
          className="photos-upload-file-video"
          name="uploadVideo"
          onChange={onFileChange}
          accept="video/*"
          capture="camcorder"
          {...inputProps}
        />
      )}
      {/* 拍照 */}
      {/* PC端使用file框 */}
      {type !== 'video' &&
        (!navigator.userAgent.toLowerCase().match(/applewebkit.*mobile.*/) || isBrowser) && (
          <input
            ref={fileRef}
            type="file"
            className="photos-upload-file-photo"
            name="uploadPhoto"
            onChange={onFileChange}
            accept="image/*"
            {...inputProps}
            // 以下的属性值会导致: 部分安卓机会不显示拍照
            // accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
          />
        )}
      {upload && upload}
      {getUploadingDOM(uploading)}
    </div>
  )
}

export default Upload
