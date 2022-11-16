import React, { useEffect } from 'react'
import { Bridge, Page, Header, Titlebar, Body } from 'seedsui-react'

export default () => {
  useEffect(() => {
    Bridge.ready()
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
