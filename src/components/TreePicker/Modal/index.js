import React, { forwardRef } from 'react'
import Tree from './../Tree'

// 内库使用-start
import SelectModal from './../../Modal/SelectModal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const SelectModal = Modal.SelectModal
测试使用-end */

const Modal = forwardRef(
  (
    {
      // Main
      mainProps,

      // Main Props
      list,
      onSelect,

      multiple,
      checkStrictly = false,
      showCheckedStrategy,
      enableHalfChecked,
      preserveValue,
      onlyLeafCheck,
      checkable = true,
      defaultExpandAll,
      TreeProps,
      itemRender,

      ...props
    },
    ref
  ) => {
    return (
      <SelectModal
        ref={ref}
        {...props}
        mainProps={{
          ...mainProps,
          list,
          onSelect,
          multiple,
          checkStrictly,
          showCheckedStrategy,
          enableHalfChecked,
          preserveValue,
          onlyLeafCheck,
          checkable,
          defaultExpandAll,
          TreeProps,
          itemRender
        }}
        main={props?.main || Tree}
      />
    )
  }
)

export default Modal
