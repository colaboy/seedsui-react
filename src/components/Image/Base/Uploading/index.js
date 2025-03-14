import React from 'react'

// 内库使用-start
import Loading from './../../../Loading'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'seedsui-react'
测试使用-end */

// 上传中图标
const Reload = ({ onReUpload }) => {
  return (
    <div
      className={`image-uploading`}
      onClick={(e) => {
        e.stopPropagation()
        // 上传失败允许重新上传
        if (e.currentTarget.parentNode.classList.contains('fail')) {
          onReUpload && onReUpload(e)
        }
      }}
    >
      <div className="image-uploading-icon">
        <Loading.Ouroboros className="image-uploading-icon-loading" />
      </div>
    </div>
  )
}

export default Reload
