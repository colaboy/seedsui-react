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
      // Main: common
      value,

      list,
      loadData,
      ...props
    },
    ref
  ) => {
    // 扩展非标准属性
    if (!props.MainProps) {
      props.MainProps = {}
    }
    if (list) props.MainProps.list = list
    if (loadData) props.MainProps.loadData = loadData

    return (
      <ModalPicker
        ref={ref}
        changeClosable
        {...props}
        value={formatValue(value)}
        className={`cascader${props.className ? ' ' + props.className : ''}`}
        MainComponent={Main}
      />
    )
  }
)

export default Modal
