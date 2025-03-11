import React, { forwardRef } from 'react'
import CommonForm from './Form'
import VirtualForm from './VirtualForm'

// layout: horizontal | vertical | inline
const Form = forwardRef(({ virtual, ...props }, ref) => {
  if (virtual) {
    return <VirtualForm ref={ref} {...props} />
  }
  return <CommonForm ref={ref} {...props} />
})

export default Form
