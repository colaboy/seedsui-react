import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import Swipe from './Swipe'
import VideoFull from './../VideoFull'

const Preview = forwardRef(
  (
    {
      list, // 需要预览的资源列表{src: '图片或视频的地址', thumb: '封面地址', type: 'video|image, 默认image', children: node}
      current, // 当前显示的资源序号或者当前资源的src链接

      onHide,
      onChange,

      children,
      ...others
    },
    ref
  ) => {
    const [pauseList, setPauseList] = useState(new Array(list.length))
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })

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
    function hideHandler(s) {
      if (list[s.activeIndex].type !== 'video') {
        if (onHide) onHide()
      }
    }
    // 滑动视频需要暂停其它视频
    function changeHandler(s) {
      s.target = refEl.current
      // 暂停所有视频
      if (list[s.activeIndex].type === 'video') {
        let newPauseList = list.map(() => true)
        setPauseList(newPauseList)
        setTimeout(() => {
          setPauseList(new Array(list.length))
        }, 500)
      }
      if (onChange) onChange(s, list[s.activeIndex], s.activeIndex)
    }
    return (
      <Swipe
        ref={refEl}
        containerChildren={children}
        defaultIndex={activeIndex}
        onHide={hideHandler}
        onChange={changeHandler}
        {...others}
      >
        {list.map((source, index) => {
          return (
            <div className="swiper-slide" key={index}>
              <div className="swiper-zoom-container">
                {source.type !== 'video' && (
                  <img alt="" className="swiper-zoom-target" src={source.src} />
                )}
                {source.type === 'video' && (
                  <VideoFull
                    pause={pauseList[index]}
                    poster={source.thumb}
                    src={source.src}
                    autoPlay={false}
                    bar={<div className="videofull-close" onClick={onHide}></div>}
                  />
                )}
                {source.children}
              </div>
            </div>
          )
        })}
      </Swipe>
    )
  }
)

export default Preview
