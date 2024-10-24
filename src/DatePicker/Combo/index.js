import React, { forwardRef } from 'react'

import Modal from './../Modal'

// 内库使用
import Combo from './../../Select/Combo'
import DateUtil from './../../DateUtil'

// 测试使用
// import { Select, DateUtil } from 'seedsui-react'
// const Combo = Select.Combo

// DatePicker
const DatePickerCombo = forwardRef(({ value, format, type = 'date', ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      type={type}
      value={value}
      ModalComponent={Modal}
      displayValueFormatter={() => {
        return DateUtil.format(value, format || type)
      }}
      {...props}
    />
  )
})

export default DatePickerCombo
