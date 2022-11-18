import React, { useEffect } from 'react'
import { Bridge, Page, Header, Titlebar, Body } from 'seedsui-react'
// import dh from './dinghuo-sdk'

export default () => {
  // 增加返回监听
  const addBackMonitor = () => {
    Bridge.onHistoryBack(handleBack)
  }
  const handleBack = async () => {
    let isBack = await Bridge.back()
    if (!isBack) {
      addBackMonitor()
    }
    return false
  }
  useEffect(() => {
    Bridge.ready(() => {
      addBackMonitor()
    })
    import('vconsole').then((VConsole) => {
      if (VConsole && VConsole.default) {
        new VConsole.default()
      } else {
        Bridge.showToast('打开调试模式失败', { mask: false })
      }
    })
  }, [])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Page>
        <Header>
          <Titlebar caption="1" />
        </Header>
        <Body>页面</Body>
      </Page>
    </div>
  )
}
