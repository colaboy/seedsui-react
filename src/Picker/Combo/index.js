import React, { forwardRef } from 'react'
import Combo from './../../Select/Combo'
import Modal from './../Modal'

// Picker
const Picker = forwardRef(({ multiple, ...props }, ref) => {
  return <Combo ref={ref} ModalComponent={Modal} {...props} />
})

export default Picker
