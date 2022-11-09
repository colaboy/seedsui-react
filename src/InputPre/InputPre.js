import React, { forwardRef } from 'react'
import InputText from './../InputText'

/**
 * @deprecated since version 5.2.8
 * 请使用<Input.AutoFit />
 */
const InputPre = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} pre />
})

export default InputPre
