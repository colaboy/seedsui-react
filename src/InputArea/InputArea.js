import React, { forwardRef } from 'react'
import InputText from './../InputText'

/**
 * @deprecated since version 5.2.8
 * 请使用<Input.Textarea />
 */
const InputArea = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="textarea" />
})

export default InputArea
