import React, { forwardRef } from 'react'

import Modal from './../Modal'

// 内库使用
import DateUtil from './../../DateUtil'
import Combo from './../../Modal/Combo'

// 测试使用
// import { DateUtil, Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// DatePicker
const DatePickerCombo = forwardRef(
  (
    {
      // Modal
      ModalProps,

      defaultPickerValue,
      onError,
      onBeforeChange,

      value,
      type = 'date',
      min,
      max,
      hourStep,
      minuteStep,
      allowClear,
      ...props
    },
    ref
  ) => {
    return (
      <Combo
        ref={ref}
        displayValueFormatter={() => {
          return DateUtil.format(value, type)
        }}
        {...props}
        // Modal
        value={value}
        allowClear={allowClear}
        ModalComponent={Modal}
        ModalProps={{
          ...ModalProps,
          hourStep,
          minuteStep,
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

export default DatePickerCombo
