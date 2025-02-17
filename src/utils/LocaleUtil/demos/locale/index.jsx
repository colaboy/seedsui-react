import React from 'react'

import { Layout, LocaleUtil, Divider, Card } from 'seedsui-react'

import 'dayjs/locale/zh-cn'
import 'seedsui-react/locale/zh_CN'

LocaleUtil.setLanguage('en_US')

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Node</Divider>
        <Card style={{ padding: 'var(--space-l)' }}>
          {LocaleUtil.locale('近7日', 'SeedsUI_last_days', [
            <span key={'0'} style={{ color: 'red' }}>
              7
            </span>
          ])}
        </Card>

        <Divider>String</Divider>
        <Card style={{ padding: 'var(--space-l)' }}>
          {LocaleUtil.locale('近7日', 'SeedsUI_last_days', ['7'])}
        </Card>

        <Divider>No locale data</Divider>
        <Card style={{ padding: 'var(--space-l)' }}>{LocaleUtil.locale('近{0}日', '', ['7'])}</Card>
      </Layout.Main>
    </Layout>
  )
}
