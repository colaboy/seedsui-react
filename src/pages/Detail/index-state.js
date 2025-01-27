import React, { useEffect, useState } from 'react'
import locale from 'library/utils/locale'
import { queryData } from './api'

import { Loading, Device } from 'seedsui-react'
import Layout from 'library/components/Layout'
import NoDataGroup from 'library/components/NoDataGroup'
import FormText from 'library/components/FormText'
import Row from 'library/components/Row'
import Col from 'library/components/Col'

// 详情页面
export default function Detail() {
  // 表单
  const [data, setData] = useState(null)

  // 错误面板: null加载中, ''加载成功, 'xx'加载错误
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  // 初始化数据
  async function loadData() {
    const id = Device.getUrlParameter('id')
    if (!id) {
      setErrMsg(
        locale('地址栏未找到参数id，无法加载数据', 'library.0aeef5e2541751e15f79aef9abc2a281')
      )
      return
    }

    Loading.show()
    let data = await queryData({ id: id })
    if (typeof data === 'string') {
      setErrMsg(data)
    } else {
      setErrMsg('')
    }
    // 初始化数据
    setData(data)
    Loading.hide()
  }

  return (
    <Layout className="full" style={{ backgroundColor: 'white' }}>
      {data && (
        <Layout.Main>
          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={24} className="color-sub">
              {locale('客户', 'library.ff0b207718d78924989384356166e4a3')}
            </Col>
            <Col span={16}>
              <FormText value={data?.customer} />
            </Col>
          </Row>

          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={8} className="color-sub">
              {locale('退货单号', 'library.2efaa8fe48e4efd421dad5b7fde1aa00')}
            </Col>
            <Col span={16}>
              <FormText value={data?.orderNo} />
            </Col>
          </Row>

          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={8} className="color-sub">
              {locale('提交日期', 'library.1de8349a0ae081c3b8c4d4a1951e8562')}
            </Col>
            <Col span={16}>
              <FormText value={data?.dateRange} />
            </Col>
          </Row>

          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={8} className="color-sub">
              {locale('客户经理', 'library.bd839db0d5d951346fdc0d235811039b')}
            </Col>
            <Col span={16}>
              <FormText value={data?.employee} />
            </Col>
          </Row>

          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={8} className="color-sub">
              {locale('订单备注', 'library.bb84d6eab6156242125acd22d08f367d')}
            </Col>
            <Col span={16}>
              <FormText value={data?.remark} />
            </Col>
          </Row>

          <Row className="border-b" style={{ padding: '10px 0', marginLeft: '12px' }}>
            <Col span={8} className="color-sub">
              {locale('状态', 'library.3fea7ca76cdece641436d7ab0d02ab1b')}
            </Col>
            <Col span={16}>
              <FormText value={data?.orderStatus} />
            </Col>
          </Row>
        </Layout.Main>
      )}

      {/* 页面级错误提示 */}
      {errMsg && <NoDataGroup caption={errMsg} style={{ margin: '20px 0' }} />}
    </Layout>
  )
}
