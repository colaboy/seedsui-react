import React from 'react'

// 照片视频预览
const Delete = ({ onClick }) => {
  return (
    <div className="image-delete" onClick={onClick}>
      <div className="image-delete-icon"></div>
    </div>
  )
}

export default Delete
