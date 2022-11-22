import React, { useRef, forwardRef } from 'react'
import Swiper from './../Swiper'
const Swipe = forwardRef(
  ({ onVisibleChange, onChange, defaultIndex, children, ...others }, ref) => {
    // 点击间隔
    const previewClickTimeoutRef = useRef(null)

    // 初始化轮播
    function handleInit(s) {
      s.slideTo(defaultIndex, 0)
    }

    // 点击事件: 防止与放大缩小的双击事件冲突
    function handleClick(s, e) {
      if (
        e.target.classList.contains('swiper-button-prev') ||
        e.target.classList.contains('swiper-button-next')
      ) {
        return
      }
      if (previewClickTimeoutRef.current) {
        window.clearTimeout(previewClickTimeoutRef.current)
        previewClickTimeoutRef.current = null
      }
      previewClickTimeoutRef.current = setTimeout(() => {
        if (onVisibleChange) onVisibleChange(false, { index: s.activeIndex })
      }, 500)
    }
    function handleZoom() {
      if (previewClickTimeoutRef.current) {
        window.clearTimeout(previewClickTimeoutRef.current)
        previewClickTimeoutRef.current = null
      }
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
            zoomChange: handleZoom,
            slideChange: onChange
          }
        }}
        {...others}
      >
        {children}
      </Swiper>
    )
  }
)

export default Swipe
