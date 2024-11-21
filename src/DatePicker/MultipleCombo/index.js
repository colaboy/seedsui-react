import React, { forwardRef } from 'react'
import MultipleModal from './../MultipleModal'
import getDisplayValue from './getDisplayValue'

// 内库使用
import Combo from './../../Modal/Combo'

// 测试使用
// import { Modal } from 'seedsui-react'
// const Combo = Modal.Combo

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
        ModalComponent={MultipleModal}
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
