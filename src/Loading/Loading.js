import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import locale from './../locale' // 国际化数据

const Loading = forwardRef(
  (
    {
      portal,
      // 类型:custom(自定义)|filling(填料环)|floating(流光)
      type = 'floating',
      maskProps = {},
      icon,
      iconProps,
      captionProps = {},
      children,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const containerRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        containerDOM: containerRef.current,
        getRootDOM: () => {
          return rootRef.current
        },
        getContainerDOM: () => {
          return containerRef.current
        }
      }
    })

    const { caption = locale('加载中...', 'loading'), ...otherCaptionProps } = captionProps

    let content = null
    if (type === 'custom') {
      // 自定义样式
      content = (
        <div
          ref={containerRef}
          {...props}
          className={`loading-custom${props.className ? ' ' + props.className : ''}`}
        >
          {icon && icon}
          {iconProps && (
            <span
              {...iconProps}
              className={`loading-custom-icon${
                iconProps.className ? ' ' + iconProps.className : ''
              }`}
            ></span>
          )}
          {caption && (
            <p
              {...otherCaptionProps}
              className={`loading-custom-caption${
                otherCaptionProps.className ? ' ' + otherCaptionProps.className : ''
              }`}
            >
              {caption}
            </p>
          )}
        </div>
      )
    } else if (type === 'filling') {
      // 填料环
      content = (
        <div
          ref={containerRef}
          {...props}
          className={`loading-filling active${props.className ? ' ' + props.className : ''}`}
        >
          <div className="loading-filling-icon"></div>
        </div>
      )
    } else if (type === 'floating') {
      // 流光
      content = (
        <div
          ref={containerRef}
          {...props}
          className={`loading-floating animated${props.className ? ' ' + props.className : ''}`}
        >
          <div className="loading-floating-icon">
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
            <div className="loading-floating-blade"></div>
          </div>
          {caption && (
            <div
              {...otherCaptionProps}
              className={`loading-floating-caption${
                otherCaptionProps.className ? ' ' + otherCaptionProps.className : ''
              }`}
            >
              {caption}
            </div>
          )}
        </div>
      )
    }

    // 组合Node
    let Node = (
      <div
        {...maskProps}
        className={
          'loading-mask mask active' + (maskProps.className ? ' ' + maskProps.className : '')
        }
        ref={rootRef}
      >
        {content}
        {children}
      </div>
    )
    if (portal) {
      return createPortal(Node, portal)
    }
    return Node
  }
)

export default Loading
