import React, { forwardRef, useRef } from 'react'
import Swipe from './Swipe'

// 内库使用
import Modal from './../../Modal'
import VideoPlayer from './../../VideoPlayer'

// 测试使用
// import { Modal, VideoPlayer } from 'seedsui-react'

const Preview = forwardRef(
  (
    {
      type, // video | image
      list, // 需要预览的资源列表{src: '图片或视频的地址', thumb: '封面地址', type: 'video|image, 默认image', children: node}
      current, // 当前显示的资源序号或者当前资源的src链接

      onClose,

      children,
      ...others
    },
    ref
  ) => {
    const videoPlayers = useRef([])

    if (!list || !list.length || !list[0].src) return null

    // 当前选中项
    let activeIndex = 0
    if (typeof current === 'number') {
      activeIndex = current
    } else if (typeof current === 'string') {
      for (let [index, source] of list.entries()) {
        if (source.src === current) activeIndex = index
      }
    }

    // 图片单击隐藏, 视频单击无反应
    function handleVisibleChange(visible) {
      if (!visible) {
        if (onClose) onClose()
      }
    }

    // 滑动视频需要暂停其它视频
    function handleSwipe() {
      // 暂停所有视频
      if (type === 'video') {
        for (let videoPlayer of videoPlayers.current) {
          videoPlayer?.pause?.()
        }
      }
    }

    return (
      <Modal.Picker
        visible
        animation="slideUp"
        className="preview-modal"
        onVisibleChange={handleVisibleChange}
      >
        <Swipe
          ref={ref}
          containerChildren={children}
          defaultIndex={activeIndex}
          onChange={handleSwipe}
          {...others}
        >
          {list.map((source, index) => {
            return (
              <div className="swiper-slide" key={index}>
                <div className="swiper-zoom-container">
                  {type !== 'video' && (
                    <img alt="" className="swiper-zoom-target" src={source.src} />
                  )}
                  {type === 'video' && (
                    <VideoPlayer
                      ref={(currentVideoPlayer) =>
                        (videoPlayers.current[index] = currentVideoPlayer)
                      }
                      poster={source.thumb}
                      src={source.src}
                      autoPlay={false}
                      header={<div className="videoplayer-header-close" onClick={onClose}></div>}
                    />
                  )}
                  {source.children}
                </div>
              </div>
            )
          })}
        </Swipe>
      </Modal.Picker>
    )
  }
)

export default Preview
