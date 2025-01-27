import React, { useEffect, useState } from 'react'
import locale from 'library/utils/locale'
import { queryData } from './api'

import { Loading, Device } from 'seedsui-react'
import Layout from 'library/components/Layout'
import NoDataGroup from 'library/components/NoDataGroup'
import Form from 'library/components/Form'
import FormText from 'library/components/FormText'

// 详情页面
export default function Detail() {
  // 表单
  const [form] = Form.useForm()

  // 错误面板: null加载中, ''加载成功, 'xx'加载错误
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  // 初始化数据
  async function loadData() {
    // 编辑
    const id = Device.getUrlParameter('id')
    if (id) {
      Loading.show()
      let data = await queryData({ id: id })
      if (typeof data === 'string') {
        setErrMsg(data)
      } else {
        setErrMsg('')
      }
      // 初始化数据
      form.setFieldsValue(data)
      Loading.hide()
    }
    // 新增
    else {
      setErrMsg(
        locale('地址栏未找到参数id，无法加载数据', 'library.0aeef5e2541751e15f79aef9abc2a281')
      )
    }
  }

  return (
    <Layout className="full" style={{ backgroundColor: 'white' }}>
      {errMsg === '' && (
        <Layout.Main>
          <Form form={form} className="wq-form">
            <Form.Item
              name="customer"
              label={locale('客户', 'library.ff0b207718d78924989384356166e4a3')}
            >
              <FormText />
            </Form.Item>

            <Form.Item
              name="orderNo"
              label={locale('退货单号', 'library.2efaa8fe48e4efd421dad5b7fde1aa00')}
            >
              <FormText />
            </Form.Item>

            {/* 开始和结束日期 */}
            <Form.Item
              name="dateRange"
              label={locale('提交日期', 'library.1de8349a0ae081c3b8c4d4a1951e8562')}
            >
              <FormText />
            </Form.Item>

            <Form.Item
              name="employee"
              label={locale('客户经理', 'library.bd839db0d5d951346fdc0d235811039b')}
            >
              <FormText />
            </Form.Item>

            <Form.Item
              name="remark"
              label={locale('订单备注', 'library.bb84d6eab6156242125acd22d08f367d')}
            >
              <FormText />
            </Form.Item>

            <Form.Item
              name="orderStatus"
              label={locale('状态', 'library.3fea7ca76cdece641436d7ab0d02ab1b')}
            >
              <FormText />
            </Form.Item>
          </Form>
        </Layout.Main>
      )}

      {/* 页面级错误提示 */}
      {errMsg && <NoDataGroup caption={errMsg} style={{ margin: '20px 0' }} />}
    </Layout>
  )
}
