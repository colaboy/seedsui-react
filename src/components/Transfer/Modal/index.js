import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用
import ModalPicker from './../../Modal/Modal'

// 测试使用
// import { Modal } from 'seedsui-react'
// const ModalPicker = Modal.Modal

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
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (list) props.MainProps.list = list

    return (
      <ModalPicker
        ref={ref}
        {...props}
        MainComponent={props?.MainComponent || Main}
        className={`transfer-modal${props.className ? ' ' + props.className : ''}`}
        value={formatValue(value)}
      />
    )
  }
)

export default Modal
