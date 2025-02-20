import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Head from './Head'

// 内库使用-start
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { SafeArea } from 'seedsui-react'
测试使用-end */

// SelectModalBase
const SelectModalBase = forwardRef(
  (
    {
      safeArea,

      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      title,
      titleProps,
      ok,
      onOk,
      okProps,
      cancel,
      onCancel,
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
      onCancel && onCancel(e)
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
        className={`mask modal-selectmodal-mask${
          maskProps?.className ? ' ' + maskProps.className : ''
        }${visible ? ' active' : ''}`}
        onClick={handleMaskClick}
        ref={modalRef}
      >
        <div
          data-animation={animation}
          onClick={(e) => e.stopPropagation()}
          {...props}
          className={`popup-animation modal-selectmodal${SafeArea.getSafeAreaClassName(safeArea)}${
            props.className ? ' ' + props.className : ''
          }${visible ? ' active' : ''}`}
        >
          {/* 头 */}
          <Head
            title={title}
            titleProps={titleProps}
            cancel={cancel}
            onCancel={handleCancelClick}
            cancelProps={cancelProps}
            ok={ok}
            onOk={onOk}
            okProps={okProps}
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

export default SelectModalBase
