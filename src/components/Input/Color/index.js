import React, { forwardRef } from 'react'
import InputText from './../Text'

const Textarea = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="color" />
})

export default Textarea
