import React, { useState } from 'react'

import { Layout, ToolBar } from 'seedsui-react'

export default () => {
  const [dateRange, setDateRange] = useState(null)
  const [item, setItem] = useState(null)
  const [search, setSearch] = useState('')
  return (
    <Layout className="full">
      <Layout.Main>
        <ToolBar>
          <ToolBar.DateRange
            title={!dateRange ? 'DateRange' : undefined}
            value={dateRange}
            onChange={setDateRange}
          />
          <ToolBar.List
            title={!item ? 'List' : undefined}
            value={item}
            onChange={setItem}
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
          <ToolBar.Search
            ok
            cancel
            qrcode
            collapse
            value={search}
            onChange={setSearch}
            onSearch={(keyword) => {
              console.log('search keyword:' + keyword)
            }}
          />
        </ToolBar>
      </Layout.Main>
    </Layout>
  )
}
