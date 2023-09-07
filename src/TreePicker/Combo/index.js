import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../Modal'

// 树选择
const TreePickerCombo = forwardRef(({ ...props }, ref) => {
  return <Combo ref={ref} ModalComponent={Modal} {...props} />
})

export default TreePickerCombo
