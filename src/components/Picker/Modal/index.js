import React, { forwardRef } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

// 内库使用-start
import SelectModal from './../../../components/Modal/SelectModal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const SelectModal = Modal.SelectModal
测试使用-end */

// Modal
const Modal = forwardRef(
  (
    {
      // Modal
      value,
      defaultPickerValue,

      // Main
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
      <SelectModal
        ref={ref}
        {...props}
        main={props?.main || Main}
        value={formatValue(value || defaultPickerValue)}
        className={`picker-modal${props.className ? ' ' + props.className : ''}`}
      />
    )
  }
)

export default Modal
