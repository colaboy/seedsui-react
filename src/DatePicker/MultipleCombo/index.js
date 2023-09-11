import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
// 测试使用
// import Combo from 'seedsui-react/lib/Select/Combo'

import Modal from './../MultipleModal'
import getMultipleDisplayValue from './getMultipleDisplayValue'

// DatePicker
const MultipleCombo = forwardRef(({ ...props }, ref) => {
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
