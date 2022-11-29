import React, { useEffect } from 'react'
import { Bridge, Page, Header, Titlebar, Body, math } from 'seedsui-react'

export default () => {
  // 增加返回监听
  const addBackMonitor = () => {
    Bridge.onHistoryBack(handleBack)
  }
  const handleBack = async () => {
    await Bridge.back(-1, {
      success: () => {
        alert('返回')
      },
      fail: () => {
        alert('不返回')
        addBackMonitor()
      }
    })
    return false
  }
  useEffect(() => {
    Bridge.ready(() => {
      addBackMonitor()
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
