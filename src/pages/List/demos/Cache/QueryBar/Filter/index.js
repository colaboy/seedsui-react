import React, { useEffect, useState } from 'react'
import { Form, Modal, LocaleUtil, Input } from 'seedsui-react'

const locale = LocaleUtil.locale

function Filter({ queryParams, onChange }) {
  const [form] = Form.useForm()

  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  // 显示弹窗时需要还原值
  useEffect(() => {
    if (!visible) return
    form.setFieldsValue(queryParams)
  }, [visible])

  return (
    <Modal.FilterCombo
      className={active ? 'active' : ''}
      onVisibleChange={(visible) => {
        setVisible(visible)
      }}
      onConfig={() => {
        console.log('setting')
      }}
      onReset={() => {
        setActive(false)
        form.resetFields()
      }}
      onOk={({ close }) => {
        console.log(form.getFieldsValue())
        onChange && onChange({ ...queryParams, ...form.getFieldsValue() })
        close()
      }}
    >
      <Form layout="vertical" form={form} style={{ marginLeft: '12px' }}>
        <Form.Item name="input" label={locale('单行文本框')}>
          <Input.Text placeholder={locale('请输入')} maxLength={50} />
        </Form.Item>
      </Form>
    </Modal.FilterCombo>
  )
}

export default Filter
