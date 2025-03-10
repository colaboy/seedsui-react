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
      onFieldsChange,
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
      >
        <Form
          className={`form`}
          {...props}
          onFieldsChange={(changedFields, allFields) => {
            onFieldsChange && onFieldsChange(changedFields, allFields)
            // 错误处理
            if (changedFields?.[0]?.errors) {
              let errorDOM = document.querySelector(
                `#form-item-${changedFields?.[0]?.name} .form-item-main-error`
              )
              errorDOM.innerHTML = changedFields[0].errors?.[0] || ''
            }
          }}
        >
          {children}
        </Form>
      </Typography.Form>
    )
  }
)

export default FormComponent
