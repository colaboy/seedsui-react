import React, { forwardRef } from 'react'
import Checkbox from './../Checkbox'

const Radio = forwardRef(({ ...props }, ref) => {
  return <Checkbox ref={ref} type="radio" {...props} />
})

export default Radio
