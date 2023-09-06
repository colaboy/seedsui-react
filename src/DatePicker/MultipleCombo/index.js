import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../MultipleModal'
import { getMultipleDisplayValue } from './../utils'

// DatePicker
const MultipleCombo = forwardRef(({ displayValueFormatter, ...props }, ref) => {
  return (
    <Combo
      ref={ref}
      ModalComponent={Modal}
      displayValueFormatter={getMultipleDisplayValue}
      {...props}
    />
  )
})

export default MultipleCombo
