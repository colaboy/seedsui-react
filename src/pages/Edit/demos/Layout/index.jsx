import React, { useRef, useEffect, useState } from 'react'
import { queryData, saveData } from './api'
import validateForm from './utils/validateForm'

import { LocaleUtil, Toast, Divider, Layout, Result, Form, Input, Select } from 'seedsui-react'
import Footer from './Footer'

// 表单编辑页面
const Edit = () => {
  // 表单
  const [form] = Form.useForm()

  // 防重复提交token
  const tokenRef = useRef('' + Date.now())

  // 基础数据
  const baseDataRef = useRef(null)

  // 错误: null加载中, ''加载成功, '错误信息'加载失败
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [])

  /**
   * queryData初始化数据方法
   * @return {Object} {baseData: xx, formData: xx}
   */
  async function loadData() {
    // 加载详情数据
    let data = await queryData()

    // baseData基础数据, 用于提交时透传的参数, 页面中的所有展示信息一律在formData中
    baseDataRef.current = data.baseData

    // 加载数据失败
    if (typeof data === 'string') {
      setErrMsg(data)
    }
    // 加载数据成功
    else {
      // 设置表单数据
      form.setFieldsValue(data.formData)
    }
  }

  // 保存
  async function handleSave() {
    // 校验表单数据
    let errMsg = await validateForm({ form })
    if (errMsg) {
      Toast.show({ content: errMsg })
      return
    }

    // 获取表单数据
    let formData = form.getFieldsValue()

    let isOk = await saveData({ baseData: baseDataRef.current, formData, tokenRef: tokenRef })
    if (!isOk) {
      console.log('保存成功, 清空数据')
    }
  }

  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Horizontal Layout</Divider>
        <Form form={form}>
          <Form.Item
            name="input"
            label={LocaleUtil.locale('单行文本框')}
            rules={[
              {
                required: true,
                message: LocaleUtil.locale('单行文本框不能为空')
              }
            ]}
          >
            <Input.Text placeholder={LocaleUtil.locale('请输入')} maxLength={50} />
          </Form.Item>
          <Form.Item name="select" label={LocaleUtil.locale('下拉选择框')}>
            <Select.Combo
              placeholder={LocaleUtil.locale('请选择')}
              list={[
                {
                  id: '1',
                  name: '选项1'
                },
                {
                  id: '2',
                  name: '选项2'
                }
              ]}
              // 互斥图标
              clear={({ clearable, triggerClear }) => {
                return clearable ? (
                  <i className="input-clear" onClick={triggerClear} />
                ) : (
                  <i className="right-icon shape-arrow-right sm"></i>
                )
              }}
            />
          </Form.Item>
          <Form.Item name="textarea" label={LocaleUtil.locale('多行文本框')}>
            <Input.AutoFit placeholder={LocaleUtil.locale('请输入')} />
          </Form.Item>
        </Form>
      </Layout.Main>

      {/* 底部 */}
      <Footer onOk={handleSave} />

      {/* 数据加载失败 */}
      {errMsg && <Result title={errMsg} style={{ margin: '20px 0' }} />}
    </Layout>
  )
}

export default Edit
