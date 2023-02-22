import React, { forwardRef } from 'react'
import Combo from './../../Picker/Combo'
import Modal from './../Modal'

// 级联选择
export default forwardRef(
  (
    {
      // 定制属性
      loadData,
      onBeforeSelectOption,

      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      optionProps,

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
          loadData: loadData,
          onBeforeSelectOption: onBeforeSelectOption,
          maskProps: maskProps,
          captionProps: captionProps,
          submitProps: submitProps,
          cancelProps: cancelProps,
          optionProps: optionProps,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)
