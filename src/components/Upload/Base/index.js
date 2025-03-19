import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'

import Choose from './Choose'
import List from './List'

const Upload = forwardRef(
  (
    {
      fileProps, // file框属性
      list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
      uploadPosition = 'end', // start | end
      upload,
      uploading,
      // Events
      onBeforeChoose, // 选择前校验
      onChoose,
      onFileChange, // 启用file选择框, 启用file框时onChoose将不生效
      onDelete,
      onReUpload,
      onPreview, // 是否支持单击预览, readOnly为true时才生效

      disabled,
      ...props
    },
    ref
  ) => {
    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onBeforeChooseRef = useRef()
    const onChooseRef = useRef()
    const onFileChangeRef = useRef()

    onBeforeChooseRef.current = onBeforeChoose
    onChooseRef.current = onChoose
    onFileChangeRef.current = onFileChange

    // 根节点
    const rootRef = useRef(null)

    const [updateStatus, setUpdateStatus] = useState(0)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        updateStatus: () => {
          setUpdateStatus(updateStatus + 1)
        }
      }
    })

    // 上传node
    function getUploadNode() {
      if (typeof upload === 'function') {
        return upload()
      }
      if (React.isValidElement(upload)) {
        return upload
      }
      return null
    }

    // 上传node
    function getChooseNode() {
      return (
        <Choose
          disabled={disabled}
          // file框属性
          fileProps={fileProps}
          // 上传DOM
          uploadNode={getUploadNode()}
          // 上传中DOM
          uploading={uploading}
          // Choose events
          onChoose={onChooseRef.current}
          onBeforeChoose={onBeforeChooseRef.current}
          onFileChange={onFileChangeRef.current}
        />
      )
    }

    return (
      <div
        ref={rootRef}
        {...props}
        className={`upload${props.className ? ' ' + props.className : ''}${
          uploadPosition === 'start' ? ' upload-position-start' : ' upload-position-end'
        }`}
      >
        {/* 头部上传按钮 */}
        {uploadPosition === 'start' && (onChoose || onFileChange) && getChooseNode()}

        {/* 列表 */}
        <List
          list={list}
          uploading={uploading}
          // Events
          onDelete={onDelete}
          onReUpload={onReUpload}
          onPreview={onPreview}
        />

        {/* 底部上传按钮 */}
        {uploadPosition === 'end' && (onChoose || onFileChange) && getChooseNode()}
      </div>
    )
  }
)

export default Upload
