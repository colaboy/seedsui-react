import React from 'react'
import { Layout, Result, Button, LocaleUtil } from 'seedsui-react'

const titleStyle = {
  padding: '12px 12px 8px',
  color: '#697b8c',
  fontSize: '14px',
  backgroundColor: 'rgba(250,251,252)'
}

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Result className="full" status={'empty'} />
      </Layout.Main>
    </Layout>
  )
}
