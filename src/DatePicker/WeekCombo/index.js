import React, { forwardRef } from 'react'

import Modal from './../WeekModal'

// 内库使用
import DateUtil from './../../DateUtil'
import Combo from './../../Modal/Combo'

// 测试使用
// import { DateUtil, Modal } from 'seedsui-react'
// const Combo = Modal.Combo

// 获取周
const WeekCombo = forwardRef(
  (
    {
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
          return DateUtil.format(value, 'week')
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

export default WeekCombo
