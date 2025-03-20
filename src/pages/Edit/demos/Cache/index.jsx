// 第三方库导入
import React, { useRef, useEffect, useState } from 'react'
import {
  Storage,
  LocaleUtil,
  Toast,
  Layout,
  Result,
  Form,
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

// 项目内部模块导入
import { cacheConfig, queryData, validateData, saveData } from './api'
import Footer from './Footer'

// 样式图片等资源文件导入
const locale = LocaleUtil.locale

// 表单编辑页面
const Edit = () => {
  // 表单
  const [form] = Form.useForm()

  // 滚动节流定时器
  const scrollThrottleRef = useRef(null)

  // 防重复提交token
  const tokenRef = useRef('' + Date.now())

  // 基础数据
  const baseDataRef = useRef(null)

  // 全屏提示: {status: 'empty|500', title: ''}
  const [mainStatus, setMainStatus] = useState(null)

  useEffect(() => {
    // 前进需要清除缓存
    // const history = useHistory()
    // if (Storage.getCache(`${cacheConfig.name}:scrollTop`) && history.action !== 'POP') {
    //   Storage.clearCache(cacheConfig.name, { match: 'prefix' })
    // }

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
      setMainStatus({
        status: '500',
        title: data
      })
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
    let data = await validateData({ form })
    if (typeof data === 'string') {
      Toast.show({ content: data })
      return
    }

    // 保存表单数据
    let result = await saveData({ baseData: baseDataRef.current, data, token: tokenRef.current })
    if (result.code === '1') {
      Toast.show({
        content: locale('提交成功!'),
        onVisibleChange: (visible) => {
          if (visible === false) {
            // 提交完成后操作: 返回等
          }
        }
      })
    }
    // 保存出错
    else {
      // 重复请求需要重新生成token
      if (result.code === '2') tokenRef.current = '' + Date.now()

      Toast.show({
        content: result.message || locale('提交失败!')
      })
    }
  }

  return (
    <Layout className="full">
      <Layout.Main
        onScroll={function (e) {
          if (scrollThrottleRef.current) {
            window.clearTimeout(scrollThrottleRef.current)
          }
          scrollThrottleRef.current = setTimeout(() => {
            // 记录滚动条位置
            if (cacheConfig?.name && typeof e?.target?.scrollTop === 'number') {
              Storage.setCache(`${cacheConfig.name}:scrollTop`, e.target.scrollTop, {
                persist: cacheConfig?.persist
              })
            }
          }, 500)
        }}
      >
        <Form
          form={form}
          style={{ marginLeft: '12px' }}
          mainCol={{ style: { paddingRight: '10px' } }}
          virtual={true}
          onValuesChange={(formData) => {
            if (window.formCacheTimeout) {
              window.clearTimeout(window.formCacheTimeout)
            }
            window.formCacheTimeout = setTimeout(() => {
              Storage.setCache(`${cacheConfig.name}:data}`, formData, {
                persist: cacheConfig.persist
              })
            }, 1000)
          }}
        >
          <Form.Item
            height={42}
            name="input"
            label={locale('Input')}
            rules={[
              {
                required: true,
                message: locale('Input cannot be empty')
              }
            ]}
          >
            <Input.Text placeholder={locale('Please input')} maxLength={50} />
          </Form.Item>
          <Form.Item
            height={97}
            name="textarea"
            maxLength={150}
            label={locale('Textarea')}
            extra={({ value }) => {
              return <div className="text-right">{`${value?.length || '0'} / 150`}</div>
            }}
          >
            <Input.Textarea placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item height={42} name="autoFit" label={locale('Auto fit')}>
            <Input.AutoFit placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item height={42} name="select" label={locale('Select')}>
            <Select.Combo
              placeholder={locale('Please select')}
              list={[
                {
                  id: '1',
                  name: 'Option1'
                },
                {
                  id: '2',
                  name: 'Option2'
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
          <Form.Item height={42} name="picker" label={locale('Picker')}>
            <Picker.Combo
              placeholder={locale('Please select')}
              list={[
                {
                  id: '1',
                  name: 'Option1'
                },
                {
                  id: '2',
                  name: 'Option2'
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
          <Form.Item height={50} name="switch" valuePropName="checked" label={locale('Switch')}>
            <Switch />
          </Form.Item>
          <Form.Item height={74} name="checkbox" label={locale('Checkbox')}>
            <Checkbox.Group
              placeholder={locale('Please select')}
              list={[
                {
                  id: '1',
                  name: 'Option1'
                },
                {
                  id: '2',
                  name: 'Option2'
                }
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item height={74} name="radio" label={locale('Radio')}>
            <Radio.Group
              placeholder={locale('Please select')}
              list={[
                {
                  id: '1',
                  name: 'Option1'
                },
                {
                  id: '2',
                  name: 'Option2'
                }
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item height={102} name="selector" label={locale('Selector')}>
            <Selector
              placeholder={locale('Please select')}
              list={[
                {
                  id: '1',
                  name: 'Option1'
                },
                {
                  id: '2',
                  name: 'Option2'
                },
                {
                  id: '3',
                  name: 'Option3'
                },
                {
                  id: '4',
                  name: 'Option4'
                }
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item height={42} name="number" label={locale('Number')}>
            <Input.Number placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item
            height={48}
            name="numberBox"
            label={locale('Number box')}
            rules={[
              {
                required: true,
                message: locale('Number box can not empty')
              }
            ]}
          >
            <Input.NumberBox placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item
            height={72}
            name="password"
            label={locale('Password')}
            extra={({ value }) => {
              return <Input.PasswordStrength value={value} />
            }}
          >
            <Input.Password placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item height={55} name="range" label={locale('Range')}>
            <Input.Range />
          </Form.Item>
          <Form.Item height={42} name="tel" label={locale('Tel')}>
            <Input.Tel placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item height={42} name="url" label={locale('Url')}>
            <Input.Url placeholder={locale('Please input')} />
          </Form.Item>
          <Form.Item height={42} name="datetime" label={locale('Datetime')}>
            <DatePicker.Combo
              type="datetime"
              placeholder={locale('Please select')}
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
          <Form.Item height={42} name="date" label={locale('Date')}>
            <DatePicker.Combo
              placeholder={locale('Please select')}
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
          <Form.Item height={42} name="time" label={locale('Time')}>
            <DatePicker.Combo
              type="time"
              placeholder={locale('Please select')}
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
          <Form.Item height={42} name="dateRange" label={locale('Date range')}>
            <DatePicker.RangeCombo
              placeholder={locale('Please select')}
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
          <Form.Item height={42} name="district" label={locale('District')}>
            <Cascader.DistrictCombo
              placeholder={locale('Please select')}
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
          <Form.Item height={44} name="location" label={locale('Location')}>
            <Location.Combo
              type="gcj02"
              config={{
                key: '',
                type: 'bmap'
              }}
              placeholder={locale('Please select')}
              allowClear
              previewVisible
              chooseVisible
              clear={({ clearable, triggerClear }) => {
                return clearable ? <i className="input-clear" onClick={triggerClear} /> : null
              }}
            />
          </Form.Item>
          <Form.Item height={52} name="signature" label={locale('Signature')}>
            <Signature.Combo />
          </Form.Item>
        </Form>
      </Layout.Main>

      {/* Footer */}
      <Footer onOk={handleSave} />

      {/* Main tip info */}
      {mainStatus && (
        <Result className="full" status={mainStatus.status} title={mainStatus.title} />
      )}
    </Layout>
  )
}

export default Edit
