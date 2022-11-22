import React, { useRef, forwardRef } from 'react'
import Swiper from './../Swiper'
const Swipe = forwardRef(({ onChange, defaultIndex, children, ...others }, ref) => {
  // 初始化轮播
  function handleInit(s) {
    s.slideTo(defaultIndex, 0)
  }

  // 点击事件: 防止与放大缩小的双击事件冲突
  function handleClick(s, e) {
    e.stopPropagation()
    // if (
    //   e.target.classList.contains('swiper-button-prev') ||
    //   e.target.classList.contains('swiper-button-next')
    // ) {
    //   return
    // }
  }
  return (
    <Swiper
      ref={ref}
      className={`preview-swiper`}
      params={{
        zoom: true,
        pagination: {
          el: '.swiper-pagination'
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        on: {
          init: handleInit,
          tap: handleClick,
          // zoomChange: handleZoom,
          slideChange: onChange
        }
      }}
      {...others}
    >
      {children}
    </Swiper>
  )
})

export default Swipe
