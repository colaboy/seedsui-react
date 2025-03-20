import React, { useState, useRef } from 'react'

import Item from './../Item'
import Preview from './../Preview'

import getPreviewType from './../getPreviewType'

// 内库使用-start
import Bridge from './../../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'seedsui-react'
测试使用-end */

// 照片视频预览
const List = ({
  type, // video.录相 | 其它.为拍照
  list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
  uploading,
  visibleCount,
  // Events
  onDelete,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
  // ...props
}) => {
  // 预览类型: browser|native
  const previewTypeRef = useRef(getPreviewType(type))

  // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
  const onDeleteRef = useRef()
  const onReUploadRef = useRef()
  const onPreviewRef = useRef()

  onDeleteRef.current = onDelete
  onReUploadRef.current = onReUpload
  onPreviewRef.current = onPreview

  const [previewCurrent, setPreviewCurrent] = useState(null)

  // 点击预览
  async function handlePreview(item, index) {
    // 自定义预览
    if (typeof onPreviewRef.current === 'function') {
      let goOn = await onPreviewRef.current(item, index)
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
    // 视频使用previewFile预览
    else if (previewTypeRef.current === 'nativeFile') {
      Bridge.previewFile({ url: item.src })
    }
    // 浏览器预览
    else {
      setPreviewCurrent(Number(index))
    }
  }

  return (
    <>
      {/* 图片列表 */}
      {list && list.length > 0
        ? list.map((item, index) => {
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
          })
        : null}
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
    </>
  )
}

export default List
