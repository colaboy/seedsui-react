import React, { forwardRef } from 'react'
import Combo from './../../Modal/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Modal/Combo'

import Modal from './../MultipleModal'
import getDisplayValue from './getDisplayValue'

// DatePicker
const MultipleCombo = forwardRef(
  (
    {
      // Combo properties
      separator,

      // Modal
      ModalProps,

      defaultPickerValue,
      onError,

      value,
      type,
      min,
      max,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        displayValueFormatter={() => {
          return getDisplayValue({
            type: type,
            value: value,
            separator: separator
          })
        }}
        {...props}
        // Modal
        value={value}
        ModalComponent={Modal}
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          onError: onError,

          type: type,
          min: min,
          max: max
        }}
      />
    )
  }
)

export default MultipleCombo
