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

      value,
      type,
      min,
      max,
      hourStep,
      minuteStep,
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
        ModalComponent={props?.ModalComponent || MultipleModal}
        value={value}
        ModalProps={{
          ...ModalProps,
          defaultPickerValue: defaultPickerValue,
          onError: onError,

          type: type,
          min: min,
          max: max,
          hourStep: hourStep,
          minuteStep: minuteStep
        }}
      />
    )
  }
)

export default MultipleCombo
