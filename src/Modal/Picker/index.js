import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Head from './Head'

// Picker
const Picker = forwardRef(
  (
    {
      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,

      // 主体
      children,
      ...props
    },
    ref
  ) => {
    // 节点
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: modalRef?.current,
        getRootDOM: () => modalRef.current
      }
    })

    useEffect(() => {
      if (visible) {
        if (onVisibleChange) onVisibleChange(visible)
      }
      // eslint-disable-next-line
    }, [visible])

    // 事件
    function handleCancelClick(e) {
      if (cancelProps?.onClick) cancelProps.onClick(e)
      onVisibleChange && onVisibleChange(false)
    }
    function handleMaskClick(e) {
      e.stopPropagation()
      if (!e.target.classList.contains('mask')) return
      if (maskProps?.onClick) maskProps.onClick(e)
      if (maskClosable) {
        onVisibleChange && onVisibleChange(false)
      }
    }

    let Node = (
      <div
        {...maskProps}
        className={`mask picker-mask${maskProps?.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
        ref={modalRef}
      >
        <div
          data-animation={animation}
          onClick={(e) => e.stopPropagation()}
          {...props}
          className={`popup-animation picker${props.className ? ' ' + props.className : ''}${
            visible ? ' active' : ''
          }`}
        >
          {/* 头 */}
          <Head
            captionProps={captionProps}
            cancelProps={cancelProps}
            submitProps={submitProps}
            onCancelClick={handleCancelClick}
          />
          {/* 主体 */}
          {children}
        </div>
      </div>
    )

    if (portal === null || portal === false) {
      return Node
    }
    return createPortal(Node, portal || document.getElementById('root') || document.body)
  }
)

export default Picker
