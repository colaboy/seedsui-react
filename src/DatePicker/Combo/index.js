import React, { forwardRef } from 'react'

import Modal from './../Modal'

// 内库使用
import DateUtil from './../../DateUtil'
import Combo from './../../Modal/Combo'

// 测试使用
// import { DateUtil, Modal as BaseModal } from 'seedsui-react'
// const Combo = BaseModal.Combo

// DatePicker
const DatePickerCombo = forwardRef(
  (
    {
      // Modal
      ModalProps,

      defaultPickerValue,
      onError,

      value,
      type = 'date',
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
          return DateUtil.format(value, type)
        }}
        {...props}
        // Modal
        ModalComponent={props?.ModalComponent || Modal}
        value={value}
        ModalProps={{
          ...ModalProps,
          hourStep,
          minuteStep,
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

export default DatePickerCombo
