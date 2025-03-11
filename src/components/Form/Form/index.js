import React, { forwardRef } from 'react'
import Form from 'rc-field-form'

// 内库使用-start
import Typography from '../../Typography'
// 内库使用-end

/* 测试使用-start
import { Typography } from 'seedsui-react'
测试使用-end */

// layout: horizontal | vertical | inline
const FormComponent = forwardRef(
  (
    {
      // Transparent to children properties
      layout = 'horizontal',
      labelCol,
      mainCol,
      scrollerDOM,
      // Own properties
      virtual,
      style,
      className,
      children,
      // Form properties
      ...props
    },
    ref
  ) => {
    return (
      <Form className={`form`} {...props}>
        <Typography.Form
          ref={ref}
          virtual={virtual}
          layout={layout}
          labelCol={labelCol}
          mainCol={mainCol}
          scrollerDOM={scrollerDOM}
          style={style}
          className={className}
        >
          {children}
        </Typography.Form>
      </Form>
    )
  }
)

export default FormComponent
