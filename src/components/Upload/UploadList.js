import React from 'react'

// 内库使用-start
import locale from './../../utils/locale'
import Clipboard from './../../utils/Clipboard'
import Toast from './../../utils/Toast'
import Bridge from './../../utils/Bridge'
import Modal from './../../components/Modal'
// 内库使用-end

/* 测试使用-start
import { locale, Clipboard, Toast, Bridge, Modal } from 'seedsui-react'
测试使用-end */

// 上传按钮
const UploadList = ({
  rootRef,
  list,

  // Events
  onPreview,
  onDelete,
  onReUpload
}) => {
  // 点击预览
  async function handlePreview(item, index, otherOptions) {
    // 自定义预览
    if (typeof onPreview === 'function') {
      let goOn = await onPreview(item, index, otherOptions)
      if (goOn === false) return
    }

    // 失败的照片用localId预览
    if (item.status === 'fail') {
      Toast.show({
        content: locale('图片未上传成功, 无法预览', 'SeedsUI_upload_fail_preview_src_error')
      })
      return
    }

    // 预览地址
    let previewUrl = decodeURIComponent(decodeURIComponent(item.src))
    if (!previewUrl || typeof previewUrl !== 'string') {
      Toast.show({
        content: locale('预览地址不合法', 'SeedsUI_preview_src_error')
      })
      return
    }

    // 只有客户端和企微支持预览文件
    if (
      (Bridge.platform === 'wq' || Bridge.platform === 'dinghuo') &&
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
      Bridge.previewFile({ url: previewUrl, name: item?.localId, size: item.size })
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
    if ('WAVE,MPEG,MP3,MPEG-4,MIDI,WMA,VQF,AMR,APE,FLAC,AAC'.indexOf(suffix.toUpperCase()) !== -1) {
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
    <>
      {/* 列表 */}
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
              <div className="upload-item-content">
                <div className="upload-item-label">{item.name || item.src}</div>
                {/* 自定义dom */}
                {item.children}
                {/* 重新上传 */}
                {onReUpload && (
                  <div
                    className="upload-item-operate upload-item-redo"
                    onClick={(e) => {
                      e.stopPropagation()

                      onReUpload(item, index, {
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
                    className="upload-item-operate upload-item-delete"
                    onClick={(e) => {
                      e.stopPropagation()

                      onDelete(item, index, {
                        event: e,
                        rootDOM: rootRef.current,
                        itemDOM: e.currentTarget.parentNode,
                        list: list
                      })
                    }}
                  ></div>
                )}
              </div>
            </div>
          )
        })}
    </>
  )
}

export default UploadList
