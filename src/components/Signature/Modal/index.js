import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import { createPortal } from 'react-dom'
import Main from './../Main'

// 内库使用-start
import Layout from './../../Layout'
// 内库使用-end

/* 测试使用-start
import { Layout } from 'seedsui-react'
测试使用-end */

// Modal
const Modal = forwardRef(
  (
    {
      portal,
      visible,
      value,
      onBeforeChange,
      onChange,
      onVisibleChange,

      // 绘画配置
      color,
      backgroundColor,
      mainProps,

      ...props
    },
    ref
  ) => {
    // Expose
    const modalRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        modalDOM: modalRef?.current?.rootDOM || modalRef?.current,
        getModalDOM: modalRef?.current?.getRootDOM
          ? modalRef?.current?.getRootDOM
          : () => modalRef.current
      }
    })

    return createPortal(
      <Layout
        ref={modalRef}
        {...props}
        className={`signature-modal${props?.className ? ' ' + props.className : ''}${
          visible === true ? '' : ' hide'
        }`}
      >
        {visible && (
          <Main
            {...(mainProps || {})}
            value={value}
            onBeforeChange={onBeforeChange}
            onChange={onChange}
            onCancel={() => {
              onVisibleChange && onVisibleChange(false)
            }}
            // 绘画配置
            color={color}
            backgroundColor={backgroundColor}
          />
        )}
      </Layout>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default Modal
