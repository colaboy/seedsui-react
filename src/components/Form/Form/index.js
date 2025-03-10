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
      style,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Typography.Form
        ref={ref}
        layout={layout}
        labelCol={labelCol}
        mainCol={mainCol}
        scrollerDOM={scrollerDOM}
        style={style}
        className={className}
      >
        <Form className={`form`} {...props}>
          {children}
        </Form>
      </Typography.Form>
    )
  }
)

export default FormComponent
