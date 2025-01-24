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
        <div style={titleStyle}>Page notice</div>
        <Result
          className="full"
          imageUrl="https://res.waiqin365.com/d/waiqin365_h5/components/error.png"
          title="This is a title"
        >
          <Button
            className="result-button primary"
            style={{ marginTop: 77 }}
            onClick={() => {
              window.top.wq.invoke('loadRequest')
              window.location.reload()
            }}
          >
            {LocaleUtil.locale('重试')}
          </Button>
          <Button
            className="result-button bg-white"
            onClick={() => {
              Bridge.back()
            }}
          >
            {LocaleUtil.locale('返回')}
          </Button>
        </Result>
      </Layout.Main>
    </Layout>
  )
}
