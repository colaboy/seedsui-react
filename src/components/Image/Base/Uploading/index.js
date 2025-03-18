import React from 'react'

// 内库使用-start
import Loading from './../../../Loading'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'seedsui-react'
测试使用-end */

// 上传中图标
const Uploading = ({ uploading, item }) => {
  // 上传中node
  function getUploadingNode(item) {
    if (typeof uploading === 'function') {
      return uploading(item)
    }
    if (React.isValidElement(uploading)) {
      return uploading
    }
    return (
      <div className="image-uploading-icon">
        <Loading.Ouroboros className="image-uploading-icon-loading" />
      </div>
    )
  }

  return <div className={`image-uploading`}>{getUploadingNode(item)}</div>
}

export default Uploading
