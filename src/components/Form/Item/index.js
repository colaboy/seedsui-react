import React, { forwardRef } from 'react'
import { Field } from 'rc-field-form'

// 内库使用-start
import Typography from '../../Typography'
// 内库使用-end

/* 测试使用-start
import { Typography } from 'seedsui-react'
测试使用-end */

const { Item, Name, Value } = Typography.Form

const FormItem = forwardRef(({ label, rules, name, children, ...props }, ref) => {
  return (
    <Item ref={ref} name={name}>
      <Name required={(rules || []).some((rule) => rule.required)}>{label}</Name>
      <Value>
        <Field ref={ref} {...props} rules={rules} name={name}>
          {children}
        </Field>
      </Value>
    </Item>
  )
})

export default FormItem
