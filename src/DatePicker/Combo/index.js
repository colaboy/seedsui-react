import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../Modal'
import getDateDisplayValue from './getDateDisplayValue'

// DatePicker
const DatePickerCombo = forwardRef(({ ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      displayValueFormatter={getDateDisplayValue}
      {...props}
    />
  )
})

export default DatePickerCombo
