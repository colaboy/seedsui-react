import React, { forwardRef } from 'react'
import Tree from './../Tree'

// 内库使用-start
import BaseModal from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const BaseModal = Modal.Modal
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
      <BaseModal
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
