import React, { forwardRef } from 'react'
import Modal from './../Modal'

// 内库使用-start
import Combo from './../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { Modal: BaseModal } from 'seedsui-react'
const Combo = BaseModal.Combo
测试使用-end */

// 树选择
const TreePickerCombo = forwardRef(
  (
    {
      // Modal
      modalProps,

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

      // 自定义渲染
      itemRender,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        {...props}
        modal={props?.modal || Modal}
        modalProps={{
          ...modalProps,
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
      />
    )
  }
)

export default TreePickerCombo
