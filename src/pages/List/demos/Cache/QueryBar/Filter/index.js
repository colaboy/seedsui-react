// 第三方库导入
import React, { useRef, useEffect, useState } from 'react'
import { Form, Modal, LocaleUtil, Input, Storage } from 'seedsui-react'
// 项目内部模块导入
import cacheConfig from './../../api/cacheConfig'
// 样式图片等资源文件导入

const locale = LocaleUtil.locale

function Filter({ queryParams, onChange }) {
  const [form] = Form.useForm()
  const modifiedRef = useRef(false)

  const [active, setActive] = useState(
    Storage.getCache(`${cacheConfig.name}:filterActive`) || false
  )
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
      // 取消还原激活状态
      onCancel={() => {
        modifiedRef.current = active
      }}
      onConfig={() => {
        console.log('setting')
      }}
      onReset={() => {
        modifiedRef.current = false
        form.resetFields()
      }}
      onOk={({ close }) => {
        Storage.setCache(`${cacheConfig.name}:filterActive`, modifiedRef.current, {
          persist: cacheConfig.persist
        })
        setActive(modifiedRef.current)
        onChange && onChange({ ...queryParams, ...form.getFieldsValue() })
        close()
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onValuesChange={() => {
          modifiedRef.current = true
        }}
        style={{ marginLeft: '12px' }}
      >
        <Form.Item name="input" label={locale('单行文本框')}>
          <Input.Text placeholder={locale('请输入')} maxLength={50} />
        </Form.Item>
      </Form>
    </Modal.FilterCombo>
  )
}

export default Filter
