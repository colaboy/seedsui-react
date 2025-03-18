import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'

import Item from './Item'
import Choose from './Choose'
import Preview from './Preview'

import getPreviewType from './getPreviewType'

// 内库使用-start
import Bridge from './../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'seedsui-react'
测试使用-end */

// 照片视频预览
const Image = forwardRef(
  (
    {
      type, // video.录相 | 其它.为拍照
      fileProps, // file框属性
      list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
      uploadPosition = 'end', // start | end
      upload, // 上传按钮覆盖的dom
      uploading,
      visibleCount,
      // Events
      onBeforeChoose, // 选择前校验
      onChoose,
      onFileChange, // 启用file选择框, 启用file框时onChoose将不生效
      onDelete,
      onReUpload,
      onPreview, // 是否支持单击预览, readOnly为true时才生效
      ...props
    },
    ref
  ) => {
    // 预览类型: browser|native
    const previewTypeRef = useRef(getPreviewType(type))

    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onBeforeChooseRef = useRef()
    const onChooseRef = useRef()
    const onFileChangeRef = useRef()
    const onDeleteRef = useRef()
    const onReUploadRef = useRef()
    const onPreviewRef = useRef()

    onBeforeChooseRef.current = onBeforeChoose
    onChooseRef.current = onChoose
    onFileChangeRef.current = onFileChange
    onDeleteRef.current = onDelete
    onReUploadRef.current = onReUpload
    onPreviewRef.current = onPreview

    const [previewCurrent, setPreviewCurrent] = useState(null)

    // 根节点
    const rootRef = useRef(null)

    // 节点
    const [updateStatus, setUpdateStatus] = useState(0)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current,
        updateStatus: () => {
          setUpdateStatus(updateStatus + 1)
        }
      }
    })

    // 点击预览
    async function handlePreview(item, index, otherOptions) {
      // 自定义预览
      if (typeof onPreviewRef.current === 'function') {
        let goOn = await onPreviewRef.current(item, index, otherOptions)
        if (goOn === false) return
        if (goOn === 'browser') {
          previewTypeRef.current = 'browser'
        }
      }

      // 本地能力预览照片
      if (previewTypeRef.current === 'nativeImage') {
        Bridge.previewImage({
          urls: list.map((item) => item.src),
          current: list[index].src,
          index: index
        })
      }
      // 勤策视频使用previewFile预览
      else if (previewTypeRef.current === 'nativeFile') {
        Bridge.previewFile({ url: item.src })
      }
      // 浏览器预览
      else {
        setPreviewCurrent(Number(index))
      }
    }

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
          type={type}
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
        className={`image${props.className ? ' ' + props.className : ''}`}
      >
        {/* 图片上传: 上传按钮 */}
        {uploadPosition === 'start' && (onChoose || onFileChange) && getChooseNode()}

        {/* 图片列表 */}
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            if (visibleCount && index + 1 > visibleCount) return null
            return (
              <Item
                key={index}
                remainCount={
                  visibleCount && index === visibleCount - 1 ? list.length - visibleCount : null
                }
                item={item}
                index={index}
                uploading={uploading}
                onDelete={
                  onDelete
                    ? (e) => {
                        onDeleteRef.current(item, index)
                      }
                    : null
                }
                onReUpload={onReUploadRef.current}
                onPreview={(e) => {
                  handlePreview(item, index)
                }}
              />
            )
          })}

        {/* 图片上传: 上传按钮 */}
        {uploadPosition === 'end' && (onChoose || onFileChange) && getChooseNode()}

        {/* 预览 */}
        {previewTypeRef.current === 'browser' && (
          <Preview
            visible={typeof previewCurrent === 'number'}
            type={type}
            onVisibleChange={(visible) => {
              if (!visible) {
                setPreviewCurrent(null)
              }
            }}
            list={list} // 需要预览的资源列表{src: '图片或视频的地址', type: 'video|image, 默认image', thumb: '封面地址'}
            current={previewCurrent}
          />
        )}
      </div>
    )
  }
)

export default Image
