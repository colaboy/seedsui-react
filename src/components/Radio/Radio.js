import React, { forwardRef } from 'react'
import Checkbox from './../Checkbox'

const Radio = forwardRef(({ icon, className, ...props }, ref) => {
  return (
    <Checkbox
      ref={ref}
      {...props}
      icon={icon === undefined ? <span className={`checkbox-icon radio`} /> : icon}
      multiple={false}
    />
  )
})

Radio.Group = Checkbox.Group

export default Radio
