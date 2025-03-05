import React from 'react'
import { Layout, Result, Button, LocaleUtil } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Result className="full" status={'500'}>
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
