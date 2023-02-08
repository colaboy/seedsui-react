import React, { forwardRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'

// 卡片选择
export default forwardRef(
  (
    {
      // 定制属性
      maskProps,
      cancelProps,
      groupProps,
      optionProps,
      animation,
      ModalProps,
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
          cancelProps: cancelProps,
          groupProps: groupProps,
          optionProps: optionProps,
          animation: animation,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)
