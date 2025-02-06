import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用-start
import ModalPicker from './../../Modal/ModalPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.ModalPicker
测试使用-end */

// Modal
const Modal = forwardRef(
  (
    {
      // Main: common
      value,

      list,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.mainProps) {
      props.mainProps = {}
    }
    if (list) props.mainProps.list = list

    return (
      <ModalPicker
        ref={ref}
        {...props}
        main={props?.main || Main}
        className={`transfer-modal${props.className ? ' ' + props.className : ''}`}
        value={formatValue(value)}
      />
    )
  }
)

export default Modal
