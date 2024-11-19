import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用
import ModalPicker from './../../Modal/MainPicker'

// 测试使用
// import { Modal } from 'seedsui-react'
// const ModalPicker = Modal.MainPicker

// Modal
const Modal = forwardRef(
  (
    {
      // Modal current properties
      defaultPickerValue,

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
        value={formatValue(value || defaultPickerValue)}
        className={`slots${props.className ? ' ' + props.className : ''}`}
        MainComponent={Main}
      />
    )
  }
)

export default Modal
