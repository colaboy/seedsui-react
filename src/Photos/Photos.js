import React, { forwardRef, useState, useRef } from 'react'
import Preview from './../Preview'
import Bridge from './../Bridge'

const Photos = forwardRef(
  (
    {
      type, // video.录相 | 其它.为拍照
      isBrowser, // 是否使用浏览器的file框拍照
      list, // [{id: '', name: '', thumb: '', src: ''}]
      upload, // 上传按钮覆盖的dom
      uploading, // 是否上传中
      onBeforeChoose, // 选择前校验
      onChoose, // 浏览器会显示file框onChoose(e), 并监听file框change事件
      onDelete,
      onClick,
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      inputProps = {},
      ...others
    },
    ref
  ) => {
    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onChooseRef = useRef()
    const onDeleteRef = useRef()
    const onClickRef = useRef()
    onChooseRef.current = onChoose
    onDeleteRef.current = onDelete
    onClickRef.current = onClick

    const [previewCurrent, setPreviewCurrent] = useState(null)

    // 拼装点击项的数据
    function getCurrent(index) {
      return {
        urls: list.map((item) => item.src),
        current: list[index].src,
        item: list[index],
        index: index
      }
    }

    // 点击整个photos容器
    async function handleClick(event) {
      const e = event.nativeEvent
      const target = e.target
      if (target.type === 'file') {
        target.value = '' // 防止选择重复图片时不触发
      }
      if (target.classList.contains('photos-upload')) {
        // 点击添加
        let choose = true
        if (typeof onBeforeChoose === 'function') choose = await onBeforeChoose()
        console.log('是否允许选择:' + choose)
        // 允许选择
        if (choose) {
          if (fileRef && fileRef.current) {
            // PC端点击file框
            // 触发点击
            if (navigator.userAgent.indexOf('Trident') > -1) {
              // IE浏览器
              fileRef.current.click()
            } else {
              // 其它浏览器
              let targetEvent = document.createEvent('MouseEvents')
              targetEvent.initEvent('click', true, true)
              fileRef.current.dispatchEvent(targetEvent)
            }
          } else {
            // 手机端点击div
            if (onChooseRef && onChooseRef.current) onChooseRef.current(e)
          }
        }
      } else if (target.classList.contains('photos-item')) {
        const index = Number(target.getAttribute('data-index') || 0)
        let res = getCurrent(index)
        // 点击照片
        if (onClickRef && onClickRef.current) {
          onClickRef.current(e, res.current, [res.item], res.index)
        }
        // 预览
        if (preview) {
          // 自定义预览
          if (typeof preview === 'function') {
            preview(e, res.current, [res.item], res.index)
          }
          // 本地能力预览
          else if (
            !isBrowser &&
            (Bridge.platform === 'wq' ||
              Bridge.platform === 'waiqin' ||
              Bridge.platform === 'wechat' ||
              Bridge.platform === 'wework' ||
              Bridge.platform === 'wechatMiniprogram' ||
              Bridge.platform === 'weworkMiniprogram')
          ) {
            Bridge.previewImage(res)
          }
          // 浏览器预览
          else {
            setPreviewCurrent(Number(index))
          }
        }
      } else if (target.classList.contains('photos-delete')) {
        // 点击删除
        const index = Number(target.parentNode.getAttribute('data-index') || 0)
        let res = getCurrent(index)
        if (onDeleteRef && onDeleteRef.current) {
          onDeleteRef.current(e, res.current, [res.item], res.index)
        }
      }
    }
    // file框选择
    const fileRef = useRef(null)
    async function handleFileChange(event) {
      const e = event.nativeEvent
      if (type === 'video') e.targetType = 'video'
      if (onChooseRef && onChooseRef.current) onChooseRef.current(e)
      e.stopPropagation()
    }
    // 图片加载完成
    function load(e) {
      let target = e.target
      target.parentNode.setAttribute('data-complete', '1')
    }
    // 图片加载失败
    function error(e) {
      let target = e.target
      target.parentNode.setAttribute('data-complete', '0')
    }

    // 获取Loading
    function getUploadingDOM() {
      if (!uploading) return null
      if (typeof uploading === 'boolean') {
        return (
          <div className="photos-upload-loading">
            <div className="photos-upload-loading-icon">
              <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
              </svg>
            </div>
          </div>
        )
      }
      return uploading
    }

    return (
      <div
        ref={ref}
        {...others}
        className={`photos${uploading ? ' uploading' : ''}${
          others.className ? ' ' + others.className : ''
        }`}
        onClick={handleClick}
      >
        {list &&
          list.length > 0 &&
          list.map((item, index) => {
            return (
              <div
                key={index}
                data-index={index}
                className={`photos-item${item.className ? ' ' + item.className : ''}`}
                style={Object.assign(
                  { backgroundImage: item.thumb ? `url(${item.thumb})` : 'initial' },
                  item.style || {}
                )}
                data-complete={!item.thumb ? `null` : ''}
              >
                {item.thumb && (
                  <img
                    className="photos-item-img"
                    src={item.thumb}
                    alt=""
                    onLoad={load}
                    onError={error}
                  />
                )}
                <div className="photos-item-error"></div>
                <div className="photos-item-load"></div>
                {onDelete && (
                  <div className="photos-delete">
                    <div className="photos-delete-icon"></div>
                  </div>
                )}
                {item.children}
              </div>
            )
          })}
        {/* 图片上传: 上传按钮 */}
        {onChoose && (
          <div className="photos-item photos-upload">
            {/* 拍照或者视频图标 */}
            <div className={`photos-upload-icon${type === 'video' ? ' video' : ''}`}></div>
            {/* 录相 */}
            {type === 'video' && Bridge.platform !== 'wq' && Bridge.platform !== 'waiqin' && (
              <input
                ref={fileRef}
                type="file"
                className="photos-upload-file-video"
                name="uploadVideo"
                onChange={handleFileChange}
                accept="video/*"
                capture="camcorder"
                {...inputProps}
              />
            )}
            {/* 拍照 */}
            {/* PC端使用file框 */}
            {type !== 'video' &&
              (!navigator.userAgent.toLowerCase().match(/applewebkit.*mobile.*/) || isBrowser) && (
                <input
                  ref={fileRef}
                  type="file"
                  className="photos-upload-file-photo"
                  name="uploadPhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  {...inputProps}
                  // 以下的属性值会导致: 部分安卓机会不显示拍照
                  // accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
                />
              )}
            {upload && upload}
            {getUploadingDOM(uploading)}
          </div>
        )}
        {/* 预览 */}
        {typeof previewCurrent === 'number' && (
          <Preview
            onHide={() => setPreviewCurrent(null)}
            list={list} // 需要预览的资源列表{src: '图片或视频的地址', type: 'video|image, 默认image', thumb: '封面地址'}
            current={previewCurrent}
          />
        )}
      </div>
    )
  }
)

export default Photos
