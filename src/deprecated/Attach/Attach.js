// require (PrototypeString.js), 使用了getSuffix
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import locale from './../../utils/locale'

/**
 * @deprecated since version 5.4.9
 * 请使用Upload
 */
const Attach = forwardRef(
  (
    {
      label,
      list, // [{id: '', name: '', src: ''}]
      uploading, // 是否上传中
      onChoose, // 浏览器会显示file框onChoose(e), 并监听file框change事件
      onDelete,
      onClick,
      // 上传按钮
      uploadProps,
      itemProps,
      ...props
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

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
    function handleClick(e) {
      const target = e.target
      if (target.classList.contains('attach-item')) {
        // 点击一行
        const index = target.getAttribute('data-index')
        if (index && onClick) onClick(e, list[index].src, [list[index]], Number(index))
      } else if (target.classList.contains('attach-item-delete')) {
        // 点击删除
        const index = target.parentNode.getAttribute('data-index')
        if (index && onDelete) onDelete(e, list[index].src, [list[index]], Number(index))
      }
    }
    // file框选择
    function handleFileChange(e) {
      if (onChoose) onChoose(e)
      e.target.value = '' // 防止选择重复图片时不触发
      e.stopPropagation()
    }

    return (
      <div
        {...props}
        className={`attach${uploading ? ' uploading' : ''}${
          props.className ? ' ' + props.className : ''
        }`}
        onClick={handleClick}
        ref={rootRef}
      >
        {/* 图片上传: 上传按钮 */}
        {onChoose && (
          <div
            {...uploadProps}
            className={`attach-upload${uploadProps?.className ? ' ' + uploadProps.className : ''}`}
          >
            <input type="file" name="uploadAttach" onChange={handleFileChange} />
            <i className={`attach-upload-icon`}></i>
            {/* Loading icon */}
            <div className="attach-upload-loading">
              <div className="attach-upload-loading-icon">
                <svg viewBox="25 25 50 50">
                  <circle cx="50" cy="50" r="20"></circle>
                </svg>
              </div>
            </div>

            {/* Label */}
            <div className="attach-upload-label">{label || locale('附件', 'SeedsUI_attach')}</div>
          </div>
        )}
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                data-index={index}
                className={`attach-item${item.className ? ' ' + item.className : ''}`}
                style={item.style || {}}
                {...itemProps}
              >
                <i className={`icon attach-item-type ${getIcon(item.src)}`}></i>
                <div className="attach-item-label">{item.name || item.src}</div>
                {onDelete && <i className="attach-item-delete"></i>}
                {item.children}
              </div>
            )
          })}
      </div>
    )
  }
)

export default Attach
