import React, { forwardRef, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Zoom, Pagination } from 'swiper/modules'
import preventDefault from './preventDefault'

// 内库使用-start
import SelectModal from './../../Modal/SelectModalBase'
import VideoPlayer from './../../VideoPlayer'
// 内库使用-end

/* 测试使用-start
import { Modal as BaseM, VideoPlayer } from 'seedsui-react'
const SelectModal = Modal.SelectModalBase
测试使用-end */

const Preview = forwardRef(
  (
    {
      visible,
      type, // video | image
      list, // 需要预览的资源列表{src: '图片或视频的地址', thumb: '封面地址', type: 'video|image, 默认image', children: node}
      current, // 当前显示的资源序号或者当前资源的src链接

      onVisibleChange,

      children,
      ...props
    },
    ref
  ) => {
    console.log('visible:', visible)
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
        if (onVisibleChange) onVisibleChange(false)
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

    function handleTouchStart(e) {
      e.stopPropagation()
      // 解决拖动时影响document弹性
      if (e.currentTarget.touchMovePreventDefault) return
      e.currentTarget.touchMovePreventDefault = true
      e.currentTarget.addEventListener('touchmove', preventDefault, false)
    }
    // touchEnd解绑后, 发现不能拖动放大缩小了, 所以不能加
    // function handleTouchEnd(e) {
    //   e.stopPropagation()
    //   // 解决拖动时影响document弹性
    //   e.currentTarget.removeEventListener('touchmove', preventDefault, false)
    // }

    return (
      <SelectModal
        visible={visible}
        animation="slideUp"
        className="image-preview-modal"
        onVisibleChange={handleVisibleChange}
        ok={false}
        onTouchStart={handleTouchStart}
        // onTouchEnd={handleTouchEnd}
        {...props}
      >
        <Swiper
          ref={ref}
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={activeIndex}
          navigation={false}
          zoom={type !== 'video' ? true : false}
          // Bullet pagination
          pagination={true}
          modules={[Zoom, Pagination]}
          onSlideChange={handleSwipe}
          style={{
            height: '100%',
            backgroundColor: 'black'
          }}
          // fix touch move
          touchMoveStopPropagation={true}
          touchStartForcePreventDefault={true}
          touchStartPreventDefault={true}
          passiveListeners={true}
        >
          {list.map((source, index) => {
            return (
              <SwiperSlide key={index}>
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
                    />
                  )}
                  {source.children}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </SelectModal>
    )
  }
)

export default Preview
