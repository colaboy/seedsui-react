import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

const Toast = forwardRef(
  (
    {
      portal,

      // 垂直方向显示位置top|middle|bottom
      position = 'middle',
      // 提示持续时间，若为 0 则不会自动关闭
      duration = 2000,

      // 是否允许背景点击
      maskClickable = true,

      // 显隐
      visible = false,
      onVisibleChange,

      // 左右图标
      licon,
      ricon,

      maskProps = {},
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

    useEffect(() => {
      if (visible) {
        handleDuration()
      }
      // eslint-disable-next-line
    }, [visible])

    // 显示数秒后，自动消失
    function handleDuration() {
      if (typeof duration !== 'number' || !duration || !onVisibleChange) {
        return
      }
      if (rootRef.current.durationTimeout) window.clearTimeout(rootRef.current.durationTimeout)
      rootRef.current.durationTimeout = setTimeout(function () {
        onVisibleChange(false)
      }, duration)
    }

    // 获取激活状态样式
    function getActiveClass() {
      return visible ? ' active' : ''
    }

    return createPortal(
      <div
        {...maskProps}
        className={`mask toast-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          maskClickable ? ' toast-propagation' : ''
        }${getActiveClass()}`}
        ref={rootRef}
      >
        <div
          ref={containerRef}
          {...props}
          className={`toast ${position || 'middle'}${
            props.className ? ' ' + props.className : ''
          }${getActiveClass()}`}
        >
          <div className="toast-wrapper">
            {licon && licon}
            <div className="toast-content">{children}</div>
            {ricon && ricon}
          </div>
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(Toast, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
