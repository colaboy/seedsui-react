import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'
// 测试使用
// import { locale, Clipboard, Bridge, Device, Preview } from 'seedsui-react'

// 内库使用
import locale from './../locale'
import Clipboard from '/../Clipboard'
import Toast from '/../Toast'
import Preview from './../Preview'
import Device from './../Device'
import Bridge from './../Bridge'

import Img from './Img'
import Status from './Status'
import Upload from './Upload'

// 照片视频预览
const Attachment = forwardRef(
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

      let previewUrl = decodeURIComponent(decodeURIComponent(item.src))
      if (typeof previewUrl !== 'string') {
        Toast.show({
          content: locale('预览地址不合法', 'SeedsUI_preview_src_error')
        })
        return
      }

      // 只有客户端和企微支持预览文件
      if (
        (Bridge.platform === 'wework' ||
          Bridge.platform === 'wq' ||
          Bridge.platform === 'dinghuo') &&
        [
          'pdf',
          'jpg',
          'jpeg',
          'png',
          'bmp',
          'txt',
          'doc',
          'docx',
          'ppt',
          'pptx',
          'xls',
          'xlsx',
          'wma',
          'wav',
          'midi',
          'cda',
          'mp3',
          'm4a',
          'mid',
          'xmf',
          'ogg',
          'rm',
          'avi',
          'ram',
          'rmvb',
          'wmv',
          'mp4',
          'mov',
          'swf',
          'flv',
          '3gp',
          'asf'
        ].some((suffix) => previewUrl.includes('.' + suffix))
      ) {
        Bridge.previewFile({ url: item.src })
      }
      // 平台预览需要复制到剪贴板
      else {
        Clipboard.copy(previewUrl, {
          success: () => {
            Toast.show({
              content: locale(
                '文件链接已复制到剪贴板，请粘贴到系统浏览器上下载',
                'SeedsUI_clipboard_success'
              )
            })
          },
          fail: () => {
            Modal.confirm({
              content: locale(
                `文件链接复制到剪贴板失败, 请长按复制<br/>${previewUrl}`,
                'SeedsUI_clipboard_fail_confirm',
                [previewUrl],
                true
              )
            })
          }
        })
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
      </div>
    )
  }
)

export default Attachment
