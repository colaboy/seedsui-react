import React, { useRef, useEffect, useState } from 'react'
import { queryData, saveData } from './api'
import validateForm from './utils/validateForm'

import {
  LocaleUtil,
  Toast,
  Divider,
  Layout,
  Result,
  Form,
  Card,
  Input,
  Select,
  Picker,
  Switch,
  Checkbox,
  Radio,
  Selector,
  DatePicker,
  Cascader,
  Location,
  Signature
} from 'seedsui-react'
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
        <Card style={{ paddingLeft: '12px' }}>
          <Form form={form} mainCol={{ style: { paddingRight: '10px' } }} virtual={true}>
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
            <Form.Item
              name="textarea"
              maxLength={150}
              label={LocaleUtil.locale('多行文本框')}
              extra={({ value }) => {
                return <div className="text-right">{`${value?.length || '0'} / 150`}</div>
              }}
            >
              <Input.Textarea placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item name="autoFit" label={LocaleUtil.locale('多行文本框')}>
              <Input.AutoFit placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item name="select" label={LocaleUtil.locale('Select')}>
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
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="picker" label={LocaleUtil.locale('滑动选择框')}>
              <Picker.Combo
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
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="switch" valuePropName="checked" label={LocaleUtil.locale('开关')}>
              <Switch />
            </Form.Item>
            <Form.Item name="checkbox" label={LocaleUtil.locale('多选')}>
              <Checkbox.Group
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
                allowClear
              />
            </Form.Item>
            <Form.Item name="radio" label={LocaleUtil.locale('单选')}>
              <Radio.Group
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
                allowClear
              />
            </Form.Item>
            <Form.Item name="selector" label={LocaleUtil.locale('多选-平铺')}>
              <Selector
                placeholder={LocaleUtil.locale('请选择')}
                list={[
                  {
                    id: '1',
                    name: '选项1'
                  },
                  {
                    id: '2',
                    name: '选项2'
                  },
                  {
                    id: '3',
                    name: '选项3'
                  },
                  {
                    id: '4',
                    name: '选项4'
                  }
                ]}
                allowClear
              />
            </Form.Item>
            <Form.Item name="number" label={LocaleUtil.locale('数值框')}>
              <Input.Number placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item
              name="numberBox"
              label={LocaleUtil.locale('Number box')}
              rules={[
                {
                  required: true,
                  message: LocaleUtil.locale('Number box can not empty')
                }
              ]}
            >
              <Input.NumberBox placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item
              name="password"
              label={LocaleUtil.locale('密码框')}
              extra={({ value }) => {
                return <Input.PasswordStrength value={value} />
              }}
            >
              <Input.Password placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item name="range" label={LocaleUtil.locale('范围选择')}>
              <Input.Range />
            </Form.Item>
            <Form.Item name="tel" label={LocaleUtil.locale('电话框')}>
              <Input.Tel placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
            <Form.Item name="url" label={LocaleUtil.locale('链接')}>
              <Input.Url placeholder={LocaleUtil.locale('请输入')} />
            </Form.Item>
          </Form>
        </Card>

        <Divider>Vertical Layout</Divider>
        <Card style={{ paddingLeft: '12px' }}>
          <Form form={form} layout="vertical" mainCol={{ style: { paddingRight: '10px' } }}>
            <Form.Item name="datetime" label={LocaleUtil.locale('日期时间')}>
              <DatePicker.Combo
                type="datetime"
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="date" label={LocaleUtil.locale('日期')}>
              <DatePicker.Combo
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="time" label={LocaleUtil.locale('时间')}>
              <DatePicker.Combo
                type="time"
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="dateRange" label={LocaleUtil.locale('日期区间')}>
              <DatePicker.RangeCombo
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="district" label={LocaleUtil.locale('地区选择')}>
              <Cascader.DistrictCombo
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                clear={({ clearable, triggerClear }) => {
                  return clearable ? (
                    <i className="input-clear" onClick={triggerClear} />
                  ) : (
                    <i className="right-icon shape-arrow-right sm"></i>
                  )
                }}
              />
            </Form.Item>
            <Form.Item name="location" label={LocaleUtil.locale('定位')}>
              <Location.Combo
                type="gcj02"
                config={{
                  key: '7b6e260fc45a67b31a265e22575f1c5e',
                  type: 'bmap'
                }}
                placeholder={LocaleUtil.locale('请选择')}
                allowClear
                previewVisible
                chooseVisible
                clear={({ clearable, triggerClear }) => {
                  return clearable ? <i className="input-clear" onClick={triggerClear} /> : null
                }}
              />
            </Form.Item>
            <Form.Item name="signature" label={LocaleUtil.locale('签名')}>
              <Signature.Combo />
            </Form.Item>
          </Form>
        </Card>
      </Layout.Main>

      {/* 底部 */}
      <Footer onOk={handleSave} />

      {/* 数据加载失败 */}
      {errMsg && <Result title={errMsg} style={{ margin: '20px 0' }} />}
    </Layout>
  )
}

export default Edit
