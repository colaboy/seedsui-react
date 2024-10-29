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
      onBeforeChange,

      value,
      type,
      min,
      max,
      allowClear,
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
        allowClear={allowClear}
        ModalComponent={Modal}
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          onError: onError,
          onBeforeChange: onBeforeChange,

          type: type,
          min: min,
          max: max,
          allowClear: allowClear
        }}
      />
    )
  }
)

export default MultipleCombo
