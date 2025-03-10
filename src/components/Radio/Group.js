import React, { forwardRef } from 'react'

// 内库使用-start
import Checkbox from './../Checkbox'
// 内库使用-end

/* 测试使用-start
import { Checkbox } from 'seedsui-react'
测试使用-end */

const Radio = forwardRef(({ icon, className, ...props }, ref) => {
  return (
    <Checkbox.Group
      ref={ref}
      {...props}
      icon={icon === undefined ? <span className={`checkbox-icon radio`} /> : icon}
      multiple={false}
    />
  )
})

Radio.Group = Checkbox.Group

export default Radio
