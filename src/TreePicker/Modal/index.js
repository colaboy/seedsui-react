import React, { forwardRef } from 'react'
import BaseModal from './../../Select/Modal'
import Tree from './../Tree'

const Modal = forwardRef(({ ...props }, ref) => {
  return <BaseModal ref={ref} {...props} MainComponent={Tree} />
})

export default Modal
