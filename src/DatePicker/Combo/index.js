import React, { forwardRef } from 'react'
import { getDateDisplayValue } from './../utils'

import Modal from './../Modal'
import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'

// DatePicker
const DatePickerCombo = forwardRef(({ format, ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      displayValueFormatter={(params) => {
        return getDateDisplayValue({ format, ...params })
      }}
      {...props}
    />
  )
})

export default DatePickerCombo
