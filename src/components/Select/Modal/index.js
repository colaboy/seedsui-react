import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用-start
import ModalPicker from './../../../components/Modal/ModalPicker'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const ModalPicker = Modal.ModalPicker
测试使用-end */

// Modal
const Modal = forwardRef(
  (
    {
      // Modal
      value,

      // Main
      list,
      ...props
    },
    ref
  ) => {
    return (
      <ModalPicker
        ref={ref}
        {...props}
        main={props?.main || Main}
        mainProps={{
          ...props.mainProps,
          list: list
        }}
        value={formatValue(value)}
        className={`select-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default Modal
