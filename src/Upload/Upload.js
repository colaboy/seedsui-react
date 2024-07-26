import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react'

// 测试使用
// import { locale, Clipboard, Toast, Bridge, Modal } from 'seedsui-react'

// 内库使用
import locale from './../locale'
import Clipboard from './../Clipboard'
import Toast from './../Toast'
import Bridge from './../Bridge'
import Modal from './../Modal'

import UploadButton from './UploadButton'

// 照片视频预览
const Upload = forwardRef(
  (
    {
      type, // video.录相 | 其它.为拍照
      fileProps, // file框属性
      list, // [{id: '', name: '', thumb: '', src: '', status: 'choose|uploading|fail|success'}]
      uploadPosition = 'end', // start | end
      uploadNode, // 上传按钮覆盖的dom
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
        <UploadButton
          type={type}
          // file框属性
          fileProps={fileProps}
          // 上传DOM
          uploadNode={uploadNode}
          // Choose events
          onChoose={onChooseRef.current}
          onBeforeChoose={onBeforeChooseRef.current}
          onFileChange={onFileChangeRef.current}
        />
      )
    }

    // 获取附件类型图标
    function getIcon(src) {
      let suffix = typeof src === 'string' ? src.getSuffix() : null
      if (!suffix) return 'unknown'
      if (suffix.indexOf('?') !== -1) {
        suffix = suffix.substring(0, suffix.indexOf('?'))
      }
      if ('RM,RMVB,MP4,3GP,AVI,MKV,WMV,MPG,VOB,FLV'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'video'
      }
      if (
        'WAVE,MPEG,MP3,MPEG-4,MIDI,WMA,VQF,AMR,APE,FLAC,AAC'.indexOf(suffix.toUpperCase()) !== -1
      ) {
        return 'audio'
      }
      if ('JPG,JPEG,WEBP,GIF,PNG,TIF,BMP'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'pic'
      }
      if ('RAR,ZIP'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'pack'
      }
      if ('DOC,DOCX'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'word'
      }
      if ('XSL,EXCEL'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'excel'
      }
      if ('PPT'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'ppt'
      }
      if ('PDF'.indexOf(suffix.toUpperCase()) !== -1) {
        return 'pdf'
      }
      return 'unknown'
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
                className={`upload-item${item.className ? ' ' + item.className : ''}${
                  item.status ? ' ' + item.status : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation()

                  handlePreview(item, index, {
                    event: e,
                    rootDOM: rootRef.current,
                    itemDOM: e.currentTarget,
                    list: list
                  })
                }}
              >
                {/* 文件图标 */}
                <i className={`icon upload-item-type ${getIcon(item.src)}`}></i>
                {/* 文件名称 */}
                <div className="upload-item-label">{item.name || item.src}</div>
                {/* 自定义dom */}
                {item.children}
                {/* 重新上传 */}
                {onReUpload && (
                  <div
                    className="upload-item-redo"
                    onClick={(e) => {
                      e.stopPropagation()

                      onReUploadRef.current(item, index, {
                        event: e,
                        rootDOM: rootRef.current,
                        itemDOM: e.currentTarget.parentNode,
                        list: list
                      })
                    }}
                  ></div>
                )}
                {/* 删除按钮 */}
                {onDelete && (
                  <div
                    className="upload-item-delete"
                    onClick={(e) => {
                      e.stopPropagation()

                      onDeleteRef.current(item, index, {
                        event: e,
                        rootDOM: rootRef.current,
                        itemDOM: e.currentTarget.parentNode,
                        list: list
                      })
                    }}
                  ></div>
                )}
              </div>
            )
          })}
        {/* 底部上传按钮 */}
        {uploadPosition === 'end' && (onChoose || onFileChange) && getUploadNode()}
      </div>
    )
  }
)

export default Upload
