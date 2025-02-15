import React from 'react'

import { Layout, Divider, ToolBar } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <ToolBar>
          <ToolBar.DateRange />
          <ToolBar.List
            value={[
              {
                id: '1',
                name: 'Option1'
              }
            ]}
            list={[
              {
                disabled: true,
                id: '',
                name: 'Disabled'
              },
              {
                id: '1',
                name: 'Option1'
              },
              {
                id: '2',
                name: 'Option2'
              }
            ]}
          />
        </ToolBar>
      </Layout.Main>
    </Layout>
  )
}
