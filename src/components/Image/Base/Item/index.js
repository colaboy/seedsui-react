import React from 'react'

import Img from './Img'
import Uploading from './../Uploading'
import Reload from './Reload'
import Delete from './Delete'
import RemainCount from './RemainCount'

// 照片视频预览
const Item = ({
  remainCount,
  item,
  index,
  uploading,
  onDelete,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}) => {
  return (
    <div
      data-index={index}
      // 状态status: choose|uploading|fail|success
      className={`image-item${item.className ? ' ' + item.className : ''}${
        item.status ? ' ' + item.status : ''
      }`}
      onClick={(e) => {
        e.stopPropagation()

        onPreview && onPreview(e)
      }}
    >
      {/* 缩略图 */}
      {item.thumb && <Img src={item.thumb} />}

      {/* 重新上传图标 */}
      <Reload
        onClick={(e) => {
          onReUpload && onReUpload(item, index)
        }}
      />

      {/* 上传中 */}
      <Uploading uploading={uploading} item={item} />

      {/* 自定义dom */}
      {item.children}
      {/* 删除按钮 */}
      {onDelete && (
        <Delete
          onClick={(e) => {
            onDelete(item, index)
          }}
        />
      )}

      {remainCount && <RemainCount count={remainCount} />}
    </div>
  )
}

export default Item
