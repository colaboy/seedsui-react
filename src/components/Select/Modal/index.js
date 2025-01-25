import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用
import ModalPicker from './../../../components/Modal/Modal'

// 测试使用
// import { Modal } from 'seedsui-react'
// const ModalPicker = Modal.Modal

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
