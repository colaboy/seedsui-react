import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

// 内库使用
import LocaleUtil from './../../utils/LocaleUtil'

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-start */

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
      content,
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

    let { caption = LocaleUtil.locale('加载中...', 'SeedsUI_refreshing'), ...otherCaptionProps } =
      captionProps
    if (typeof content === 'string') {
      caption = content
    }

    let contentNode = null
    if (type === 'custom') {
      // 自定义样式
      contentNode = (
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
      contentNode = (
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
      contentNode = (
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
        {contentNode}
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
