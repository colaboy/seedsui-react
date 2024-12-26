import React, { forwardRef } from 'react'

import Modal from './../Modal'

// 内库使用-start
import DateUtil from './../../DateUtil'
import Combo from './../../../Modal/Combo'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Modal as BaseModal } from 'seedsui-react'
const Combo = BaseModal.Combo
测试使用-end */

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
