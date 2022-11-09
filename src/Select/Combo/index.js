import React, { forwardRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'

// 下拉选择
export default forwardRef(
  (
    {
      // 定制属性
      maskProps,
      submitProps,
      cancelProps,
      optionProps,
      ModalProps,
      // 标准属性
      ...params
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        ModalComponent={Modal}
        ModalProps={{
          maskProps: maskProps,
          submitProps: submitProps,
          cancelProps: cancelProps,
          optionProps: optionProps,
          ...ModalProps
        }}
        {...params}
      />
    )
  }
)
