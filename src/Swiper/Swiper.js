// require (PrototypeArray.js), 使用了equals
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'

// eslint-disable-next-line
export default forwardRef(
  (
    {
      params = {},
      // 画布容器
      wrapperAttribute = {},
      // 分页
      paginationAttribute = {},
      // 翻页
      prevAttribute = {},
      nextAttribute = {},
      // 轮播页
      children,
      // 容器子元素
      containerChildren,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      if (!rootRef || !rootRef.current) return
      if (!window.Swiper) {
        window.Swiper = require('./instance')
        if (typeof window.Swiper === 'object') {
          window.Swiper = window.Swiper.default
        }
      }
      instance.current = new window.Swiper(rootRef.current, {
        ...params
      })
    }, []) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.update()
      if (params.on) {
        for (let eventName in params.on) {
          instance.current.off(eventName)
          instance.current.on(eventName, params.on[eventName])
        }
      }
    }

    return (
      <div
        ref={rootRef}
        {...others}
        className={`swiper-container${others.className ? ' ' + others.className : ''}`}
      >
        <div
          {...wrapperAttribute}
          className={`swiper-wrapper${
            wrapperAttribute.className ? ' ' + wrapperAttribute.className : ''
          }`}
        >
          {children}
        </div>
        {/* 系统默认分页 */}
        {params.pagination && (
          <div
            {...paginationAttribute}
            className={`swiper-pagination${
              paginationAttribute.className ? ' ' + paginationAttribute.className : ''
            }`}
          ></div>
        )}
        {/* 翻页控件 */}
        {params.navigation && params.navigation.prevEl && (
          <div
            {...prevAttribute}
            className={`swiper-button-prev${
              prevAttribute.className ? ' ' + prevAttribute.className : ''
            }`}
          ></div>
        )}
        {params.navigation && params.navigation.nextEl && (
          <div
            {...nextAttribute}
            className={`swiper-button-next${
              nextAttribute.className ? ' ' + nextAttribute.className : ''
            }`}
          ></div>
        )}
        {containerChildren}
      </div>
    )
  }
)
