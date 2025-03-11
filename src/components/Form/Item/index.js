import React, { forwardRef } from 'react'
import { Field } from 'rc-field-form'

// 内库使用-start
import Typography from '../../Typography'
import getExtraNode from '../../Typography/Form/Main/getExtraNode'
// 内库使用-end

/* 测试使用-start
import { Typography } from 'seedsui-react'
测试使用-end */

const { Item, Label, Main } = Typography.Form

const FormItem = forwardRef(
  (
    {
      // Own properties
      help,
      name, // field required property
      extra,
      inputExtra,
      label,
      // Field properties
      valuePropName,
      getValueProps,
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
      <Item ref={ref} name={name} {...props}>
        <Label help={help} required={(rules || []).some((rule) => rule.required)}>
          {label}
        </Label>

        <Field
          rules={rules}
          name={name}
          getValueProps={getValueProps}
          valuePropName={valuePropName}
          shouldUpdate={shouldUpdate}
          initialValue={initialValue}
          validateTrigger={validateTrigger}
        >
          {(control, renderMeta, context) => {
            return (
              <Main
                extra={() => {
                  return getExtraNode(extra, {
                    params: { ...control, errors: renderMeta?.errors },
                    className: 'form-item-main-input-extra'
                  })
                }}
                inputExtra={() => {
                  return getExtraNode(inputExtra, {
                    params: { ...control, errors: renderMeta?.errors },
                    className: 'form-item-main-input-extra'
                  })
                }}
                error={renderMeta?.errors?.[0] || ''}
              >
                {/* In Form, Set value and onChange props to children: */}
                {React.Children.map(children, (child) => {
                  // 检查是否是一个 React 组件（函数组件或类组件），而不是原生元素
                  if (React.isValidElement(child) && typeof child.type !== 'string') {
                    // 克隆该组件并注入新的属性
                    return React.cloneElement(child, {
                      ...control,
                      onChange: (...changeProps) => {
                        // 调用原有onChange（如果存在）
                        if (typeof child.props.onChange === 'function') {
                          child.props.onChange(...changeProps)
                        }
                        // 执行父组件的逻辑
                        control?.onChange && control.onChange(...changeProps)
                      }
                    })
                  }
                  // 如果是原生元素，直接返回
                  return child
                })}
              </Main>
            )
          }}
        </Field>
      </Item>
    )
  }
)

export default FormItem
