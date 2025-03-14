// 第三方库导入
import React, { useEffect, useState } from 'react'
import { LocaleUtil, Toast, Divider, Layout, Result, Typography, Card } from 'seedsui-react'

// 项目内部模块导入
import { queryData, approveData } from './api'
import Footer from './Footer'

// 样式图片等资源文件导入

const locale = LocaleUtil.locale
const { Item, Label, Main } = Typography.Form

// 表单编辑页面
const FormDetail = () => {
  // 详情数据
  const [data, setData] = useState(null)

  // 全屏提示: {status: 'empty|500', title: ''}
  const [mainStatus, setMainStatus] = useState(null)

  useEffect(() => {
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [])

  // 加载数据
  async function loadData() {
    // 加载详情数据
    let data = await queryData()
    // 加载数据失败
    if (typeof data === 'string') {
      setMainStatus({
        status: '500',
        title: data
      })
    }
    // 加载数据成功
    else {
      setData(data)
    }
  }

  // 保存
  async function handleApprove() {
    // 保存表单数据
    let result = await approveData()
    if (result.code === '1') {
      Toast.show({
        content: locale('审批通过!'),
        onVisibleChange: (visible) => {
          if (visible === false) {
            // 提交完成后操作: 返回等
          }
        }
      })
    }
    // 保存出错
    else {
      Toast.show({
        content: result.message || locale('审批失败!')
      })
    }
  }

  return (
    <Layout className="full">
      <Layout.Main>
        <Card>
          <Divider>Horizontal Layout</Divider>
          <Typography.Form
            style={{ marginLeft: '12px' }}
            mainCol={{ style: { paddingRight: '10px' } }}
          >
            <Item>
              <Label>{locale('Input')}</Label>
              <Main>{Typography.getDisplayValue(data?.input)}</Main>
            </Item>

            <Item>
              <Label>{locale('Select')}</Label>
              <Main>{Typography.getDisplayValue(data?.select)}</Main>
            </Item>
          </Typography.Form>
        </Card>
        <Card>
          <Divider>Vertical Layout</Divider>
          <Typography.Form
            style={{ marginLeft: '12px' }}
            mainCol={{ style: { paddingRight: '10px' } }}
          >
            <Item>
              <Label>{locale('Input')}</Label>
              <Main>{Typography.getDisplayValue(data?.input)}</Main>
            </Item>

            <Item>
              <Label>{locale('Select')}</Label>
              <Main>{Typography.getDisplayValue(data?.select)}</Main>
            </Item>
          </Typography.Form>
        </Card>
      </Layout.Main>

      {/* Footer */}
      <Footer onOk={handleApprove} />

      {/* Main tip info */}
      {mainStatus && (
        <Result className="full" status={mainStatus.status} title={mainStatus.title} />
      )}
    </Layout>
  )
}

export default FormDetail
