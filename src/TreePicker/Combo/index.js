import React, { forwardRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'

// 树选择
const TreePickerCombo = forwardRef(
  (
    {
      // 定制属性
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      optionProps,
      ModalProps,
      TreeProps,
      // 标准属性
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        ModalProps={{
          maskProps: maskProps,
          captionProps: captionProps,
          submitProps: submitProps,
          cancelProps: cancelProps,
          optionProps: optionProps,
          TreeProps: TreeProps,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)

export default TreePickerCombo
