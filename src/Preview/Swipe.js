import React, {forwardRef} from 'react';
import {createPortal} from 'react-dom';
import Swiper from './../Swiper';

let clickSpace = null;
const Swipe = forwardRef(({
  onHide,
  onChange,
  defaultIndex,
  children,
  ...others
}, ref) =>  {
  // 初始化轮播
  function initHandler (s) {
    s.slideTo(defaultIndex, 0);
  }

  // 点击事件: 防止与放大缩小的双击事件冲突
  function clickHandler (s, e) {
    if (e.target.classList.contains('swiper-button-prev') || e.target.classList.contains('swiper-button-next')) {
      return;
    }
    if (clickSpace) {
      window.clearTimeout(clickSpace)
      clickSpace = null
    }
    clickSpace = setTimeout(() => {
      if (onHide) onHide(s, e);
    }, 500)
  }
  function zoomHandler () {
    if (clickSpace) {
      window.clearTimeout(clickSpace)
      clickSpace = null
    }
  }
  return createPortal(
    <Swiper
      ref={ref}
      className={`preview-swiper`}
      params={{
        zoom: true,
        pagination: {
          el: '.swiper-pagination',
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        on: {
          init: initHandler,
          tap: clickHandler,
          zoomChange: zoomHandler,
          slideChange: onChange
        }
      }}
      {...others}
    >
      {children}
    </Swiper>,
    document.getElementById('root') || document.body
  )
})

export default Swipe
