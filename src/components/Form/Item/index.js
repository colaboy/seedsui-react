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
      name,
      // Own properties
      extra,
      label,
      rules,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Item ref={ref} help={help} name={name}>
        <Label required={(rules || []).some((rule) => rule.required)}>{label}</Label>
        <Main>
          <div className="form-item-main-input">
            <Field ref={ref} {...props} rules={rules} name={name}>
              {children}
            </Field>
          </div>
          {extra && <div className="list-item-main-extra">{extra}</div>}
        </Main>
      </Item>
    )
  }
)

export default FormItem
