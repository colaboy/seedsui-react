import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'
import Preview from './../Preview'
import Bridge from './../Bridge'
import Img from './Img'
import Status from './Status'
import Upload from './Upload'

// 照片视频预览
const Image = forwardRef(
  (
    {
      type, // video.录相 | 其它.为拍照
      isBrowser, // 是否使用浏览器的file框拍照
      list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
      uploadNode, // 上传按钮覆盖的dom
      uploading, // 是否上传中
      onBeforeChoose, // 选择前校验
      onChoose, // 浏览器会显示file框onChoose(e), 并监听file框change事件
      onDelete,
      onReUpload,
      onPreview, // 是否支持单击预览, readOnly为true时才生效
      ...props
    },
    ref
  ) => {
    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onBeforeChooseRef = useRef()
    const onChooseRef = useRef()
    const onDeleteRef = useRef()
    const onReUploadRef = useRef()
    const onPreviewRef = useRef()

    onBeforeChooseRef.current = onBeforeChoose
    onChooseRef.current = onChoose
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
      }

      // 浏览器预览
      if (isBrowser) {
        setPreviewCurrent(Number(index))
      }
      // 本地能力预览
      else if (
        Bridge.platform === 'wq' ||
        Bridge.platform === 'waiqin' ||
        Bridge.platform === 'wechat' ||
        Bridge.platform === 'wework' ||
        Bridge.platform === 'wechatMiniprogram' ||
        Bridge.platform === 'weworkMiniprogram'
      ) {
        if (type === 'video') {
          Bridge.previewFile({ url: item.src })
        } else {
          Bridge.previewImage({
            urls: list.map((item) => item.src),
            current: list[index].src,
            item: list[index],
            index: index
          })
        }
      }
      // 浏览器预览
      else {
        console.error('SeedsUI Error: 不支持当前预览类型')
      }
    }

    // 判断是否只有一项
    let onlyOneItem = false
    // 允许选择时，列表为空
    if (onChoose) {
      if (!list?.length) onlyOneItem = true
    }
    // 不允许选择时，列表为1项
    else if (list?.length === 1) {
      onlyOneItem = true
    }

    return (
      <div
        ref={rootRef}
        {...props}
        className={`image${onlyOneItem ? ' onlyOneItem' : ''}${
          props.className ? ' ' + props.className : ''
        }`}
      >
        {/* 图片列表 */}
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                data-index={index}
                // 状态status: choose|uploading|fail|success
                className={`image-item${item.className ? ' ' + item.className : ''}${
                  item.status ? ' ' + item.status : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation()

                  handlePreview(item, index, {
                    itemDOM: e.currentTarget,
                    list: list
                  })
                }}
              >
                {/* 缩略图 */}
                {item.thumb && <Img src={item.thumb} />}

                {/* 状态遮罩 */}
                <Status
                  onReUpload={(e) => {
                    onReUploadRef.current &&
                      onReUploadRef.current(item, index, {
                        list: list,
                        itemDOM: e.currentTarget.parentNode
                      })
                  }}
                />
                {/* 自定义dom */}
                {item.children}
                {/* 删除按钮 */}
                {onDelete && (
                  <div
                    className="image-delete"
                    onClick={(e) => {
                      e.stopPropagation()

                      onDeleteRef.current(item, index, {
                        itemDOM: e.currentTarget.parentNode,
                        list: list
                      })
                    }}
                  >
                    <div className="image-delete-icon"></div>
                  </div>
                )}
              </div>
            )
          })}
        {/* 图片上传: 上传按钮 */}
        {onChoose && (
          <Upload
            type={type}
            // 文件选择框
            isBrowser={isBrowser}
            // 上传DOM和状态
            uploadNode={uploadNode}
            uploading={uploading}
            // Choose events
            onChoose={onChooseRef.current}
            onBeforeChoose={onBeforeChooseRef.current}
          />
        )}

        {/* 预览 */}
        {typeof previewCurrent === 'number' && (
          <Preview
            type={type}
            onHide={() => setPreviewCurrent(null)}
            list={list} // 需要预览的资源列表{src: '图片或视频的地址', type: 'video|image, 默认image', thumb: '封面地址'}
            current={previewCurrent}
          />
        )}
      </div>
    )
  }
)

export default Image
