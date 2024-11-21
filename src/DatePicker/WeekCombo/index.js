import React, { forwardRef } from 'react'

import WeekModal from './../WeekModal'

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
          return DateUtil.format(value, 'week')
        }}
        {...props}
        // Modal
        value={value}
        allowClear={allowClear}
        ModalComponent={WeekModal}
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

export default WeekCombo
