import React from 'react'
import locale from 'library/utils/locale'
import customValidate from './CustomComponent/validate'

import Form from 'library/components/Form'
import CustomComponent from './CustomComponent'
import CustomFormItem from './CustomFormItem'

const Form3 = ({ form, ...props }) => {
  return (
    <Form form={form} {...props}>
      <Form.Item
        name="special"
        label={locale('自定义组件与校验', 'library.36b169caeb2fa8cafea614b85476067d')}
        rules={[
          {
            validateTrigger: 'onSubmit', // 仅在提交的时候触发验证
            validator: (_, value) => customValidate({ value })
          }
        ]}
      >
        <CustomComponent />
      </Form.Item>
      <Form.Item name="customFormItem">
        <CustomFormItem />
      </Form.Item>
    </Form>
  )
}

export default Form3
