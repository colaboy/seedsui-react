import React, { forwardRef } from 'react'

import BaseModal from './../../Select/Modal'
import Main from './../Main'

const Modal = forwardRef(({ ...props }, ref) => {
  return (
    <BaseModal
      ref={ref}
      {...props}
      className={`slots${props.className ? ' ' + props.className : ''}`}
      multiple={false}
      MainComponent={Main}
    />
  )
})

export default Modal
