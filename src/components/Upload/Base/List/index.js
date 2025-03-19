import React, { useRef } from 'react'

import Item from './../Item'

// File List
const List = ({
  list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
  uploading,
  // Events
  onDelete,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}) => {
  // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
  const onDeleteRef = useRef()
  const onReUploadRef = useRef()
  const onPreviewRef = useRef()

  onDeleteRef.current = onDelete
  onReUploadRef.current = onReUpload
  onPreviewRef.current = onPreview

  return (
    <>
      {/* 列表 */}
      {list &&
        list.length > 0 &&
        list.map((item, index) => {
          return (
            <Item
              key={index}
              item={item}
              index={index}
              uploading={uploading}
              onPreview={onPreviewRef.current}
              onDelete={onDeleteRef.current}
              onReUpload={onReUploadRef.current}
            />
          )
        })}
    </>
  )
}

export default List
