import React, { forwardRef } from 'react'
import InputText from './../InputText'

/**
 * @deprecated since version 5.2.8
 * 请使用<Input.Password />
 */
const InputPassword = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="password" />
})

export default InputPassword
