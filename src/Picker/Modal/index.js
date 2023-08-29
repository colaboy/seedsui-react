import React, { forwardRef } from 'react'

import ListPickerModal from './../../Select/Modal'
import Main from './../Main'

const Modal = forwardRef(({ ...props }, ref) => {
  return <ListPickerModal ref={ref} {...props} MainComponent={Main} />
})

export default Modal
