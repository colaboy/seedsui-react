import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../Modal'

// 级联选择
const CascaderCombo = forwardRef(
  (
    {
      // 定制属性
      loadData,
      onBeforeSelectOption,

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
          optionProps: optionProps,
          ...ModalProps
        }}
        {...props}
      />
    )
  }
)

export default CascaderCombo
