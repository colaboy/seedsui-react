import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'

import Img from './Img'
import Status from './Status'
import Upload from './Upload'
import Preview from './Preview'

// 内库使用
import Device from './../../utils/Device'
import Bridge from './../../utils/Bridge'

// 测试使用
// import { Bridge, Device } from 'seedsui-react'

// 照片视频预览
const Image = forwardRef(
  (
    {
      type, // video.录相 | 其它.为拍照
      fileProps, // file框属性
      list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
      uploadPosition = 'end', // start | end
      uploadNode, // 上传按钮覆盖的dom
      statusRender, // 自定义状态渲染func({status, itemDOM})
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
      }

      // 本地能力预览照片
      if (
        type !== 'video' &&
        Device.device === 'mobile' &&
        (Bridge.platform === 'wq' ||
          Bridge.platform === 'waiqin' ||
          Bridge.platform === 'wechat' ||
          Bridge.platform === 'wework' ||
          Bridge.platform === 'alipay' ||
          Bridge.platform === 'dingtalk' ||
          Bridge.platform === 'lark' ||
          Bridge.platform === 'wechatMiniprogram' ||
          Bridge.platform === 'weworkMiniprogram' ||
          Bridge.platform === 'alipayMiniprogram')
      ) {
        Bridge.previewImage({
          urls: list.map((item) => item.src),
          current: list[index].src,
          index: index
        })
      }
      // 预览视频或照片
      else {
        // 勤策视频使用previewFile预览
        if (Bridge.platform === 'wq' && type === 'video') {
          Bridge.previewFile({ url: item.src })
        } else {
          setPreviewCurrent(Number(index))
        }
      }
    }

    // 上传node
    function getUploadNode() {
      return (
        <Upload
          type={type}
          // file框属性
          fileProps={fileProps}
          // 上传DOM
          uploadNode={uploadNode}
          // Custom Status
          statusRender={statusRender}
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
        {uploadPosition === 'start' && (onChoose || onFileChange) && getUploadNode()}

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
                    event: e,
                    rootDOM: rootRef.current,
                    itemDOM: e.currentTarget,
                    setPreviewCurrent: setPreviewCurrent,
                    list: list
                  })
                }}
              >
                {/* 缩略图 */}
                {item.thumb && <Img src={item.thumb} />}

                {/* 状态遮罩 */}
                <Status
                  statusRender={statusRender}
                  onReUpload={(e) => {
                    onReUploadRef.current &&
                      onReUploadRef.current(item, index, {
                        event: e,
                        list: list,
                        rootDOM: rootRef.current,
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
                        event: e,
                        rootDOM: rootRef.current,
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
        {uploadPosition === 'end' && (onChoose || onFileChange) && getUploadNode()}

        {/* 预览 */}
        {typeof previewCurrent === 'number' && (
          <Preview
            type={type}
            onClose={() => setPreviewCurrent(null)}
            list={list} // 需要预览的资源列表{src: '图片或视频的地址', type: 'video|image, 默认image', thumb: '封面地址'}
            current={previewCurrent}
          />
        )}
      </div>
    )
  }
)

export default Image
