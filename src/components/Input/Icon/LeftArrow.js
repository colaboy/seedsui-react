import React, { forwardRef } from 'react'

// 内库使用-start
import Icon from './../../Icon'
// 内库使用-end

/* 测试使用-start
import { Icon } from 'seedsui-react'
测试使用-end */

const IconLeftArrow = forwardRef(({ name, size, ...props }, ref) => {
  return (
    <Icon
      {...props}
      className={`input-icon input-icon-left-arrow${
        props.className ? ' ' + props.className : ' left-icon'
      }`}
      ref={ref}
    />
  )
})

export default IconLeftArrow
