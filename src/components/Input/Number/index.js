import React, { forwardRef } from 'react'
import InputText from './../Text'

const Number = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="number" />
})

export default Number
