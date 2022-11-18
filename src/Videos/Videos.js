import React, { forwardRef, Fragment, useState } from 'react'
import Toast from './../Toast'
import Photos from './../Photos'
import VideoFull from './../VideoFull'
// import Camera from './../Camera'
import locale from './../locale'

// 预览项
let previewIndex = null

// 视频栅格
const Videos = forwardRef(
  (
    {
      onClick,
      showPlay = false,
      // onChoose,
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      /*
      显示或隐藏预览 boolean|func, 默认true,
      func(e, value)
      e:{
        currentTarget: div.input-text-box
        target: div.input-text-box
        type: "choose|preview"
        visible: false|true
      }
      value: 同传入的value
      */
      // 显隐路由
      routePath = 'componentPage=1',
      // 属性
      videoFullProps = {},
      ...others
    },
    ref
  ) => {
    // 预览项
    let [previewItem, setPreivewItem] = useState(null)

    // 返回
    function handlePop() {
      handleClosePreview()
      // 返回后允许关闭webview
      window.onHistoryBack = null
      window.removeEventListener('popstate', handlePop, false)
    }

    // 点击预览
    function handleClick(e, src, options, index) {
      let item = options[0]

      // 点击回调
      if (onClick) {
        onClick(e, src, options, index)
      }

      if (!preview) return
      if (!item.src) {
        Toast.show({ content: locale('没有参数src', 'no_param_src') })
      }

      // 增加历史记录
      if (routePath) {
        // 阻止关闭webview
        window.onHistoryBack = () => {}

        // 路径增加routePath
        let path = window.location.href
        path += `${path.indexOf('?') === -1 ? '?' : '&'}${routePath}`

        // 增加历史记录
        window.history.pushState(
          {
            href: path
          },
          document.title,
          path
        )

        window.removeEventListener('popstate', handlePop, false)
        window.addEventListener('popstate', handlePop, false)
      }

      // 预览回调
      if (typeof preview === 'function') {
        previewIndex = index
        e.visible = true
        preview(e, src, options, index)
      }

      // 客户端预览视频有问题, 所以使用h5预览
      previewItem = item
      setPreivewItem(item)
    }

    // 关闭h5预览
    function handleClosePreview(e) {
      // 已经返回, 路由却没变
      if (window.location.href.indexOf(routePath) !== -1) {
        window.history.go(-1)
        return
      }

      // 预览回调
      if (typeof preview === 'function') {
        e.visible = false
        preview(e, previewItem.src, [previewItem], previewIndex)
      }

      // 隐藏预览
      previewItem = null
      setPreivewItem(null)
    }

    /*
    // h5录相
    const [showRecord, setShowRecord] = useState(false);
    // 录制视频
    function choose (e) {
      if (Bridge.platform !== 'wq') {
        setShowRecord(true);
        return;
      }
      if (onChoose) {
        onChoose(e);
      }
    }
    // h5录相
    function record (e) {
      if (onChoose) {
        onChoose(e);
      }
    }
    */
    return (
      <Fragment>
        <Photos
          ref={ref}
          {...others}
          onClick={handleClick}
          // onChoose={choose}
          type="video"
          preview={false}
          children={
            showPlay ? ( // 视频播放图标
              <div className="photos-item-video">
                <div className="photos-item-video-icon"></div>
              </div>
            ) : null
          }
        />
        {/* h5预览 */}
        {previewItem && (
          <VideoFull
            portal={document.getElementById('root') || document.body}
            poster={previewItem.thumb}
            src={previewItem.src}
            autoPlay
            bar={<div className="videofull-close" onClick={handleClosePreview}></div>}
            {...videoFullProps}
          />
        )}
        {/* 录相 */}
        {/* {showRecord && <Camera
            onHide={() => setShowRecord(false)}
            onRecord={record}
          />} */}
      </Fragment>
    )
  }
)

export default Videos
