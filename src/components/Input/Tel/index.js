import React, { forwardRef } from 'react'
import InputText from './../Text'

const InputTel = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="tel" />
})

export default InputTel
