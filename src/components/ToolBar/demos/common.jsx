import React from 'react'

import { Layout, Divider, ToolBar } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>ToolBar</Divider>
        <ToolBar></ToolBar>
      </Layout.Main>
    </Layout>
  )
}
