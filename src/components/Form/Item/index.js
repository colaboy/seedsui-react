import React, { forwardRef } from 'react'
import { Field } from 'rc-field-form'

// 内库使用-start
import Typography from '../../Typography'
// 内库使用-end

/* 测试使用-start
import { Typography } from 'seedsui-react'
测试使用-end */

const { Item, Label, Main } = Typography.Form

const FormItem = forwardRef(
  (
    {
      // Transparent flow properties to children
      help,
      name, // field required property
      // Own properties
      mainExtra,
      inputExtra,
      label,
      // Field properties
      shouldUpdate,
      initialValue,
      validateTrigger, // onBlur
      rules,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Item ref={ref} help={help} name={name} {...props}>
        <Label required={(rules || []).some((rule) => rule.required)}>{label}</Label>
        <Field
          rules={rules}
          name={name}
          shouldUpdate={shouldUpdate}
          initialValue={initialValue}
          validateTrigger={validateTrigger}
        >
          <Main mainExtra={mainExtra} inputExtra={inputExtra}>
            {children}
          </Main>
        </Field>
      </Item>
    )
  }
)

export default FormItem
