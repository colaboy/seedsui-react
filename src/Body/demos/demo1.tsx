import React from 'react'
import { Page, Header, Titlebar, Body } from 'seedsui-react'

export default () => {
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
