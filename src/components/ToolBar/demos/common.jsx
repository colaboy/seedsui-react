import React, { useState } from 'react'

import { Layout, ToolBar, Divider, Space } from 'seedsui-react'

export default () => {
  const [dateRange, setDateRange] = useState(null)
  const [item, setItem] = useState(null)
  const [search, setSearch] = useState('')
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>SearchBar</Divider>
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
            // Display config
            ok
            // cancel
            barCode
            combo="icon"
            // value
            value={search}
            onChange={setSearch}
            onSearch={(keyword) => {
              console.log('search keyword:' + keyword)
            }}
          />
          <Space.Compact>
            <ToolBar.Button>Button1</ToolBar.Button>
            <ToolBar.Button>Button2</ToolBar.Button>
          </Space.Compact>
        </ToolBar>

        <Divider>SearchBar</Divider>
        <ToolBar>
          <ToolBar.Search
            value={search}
            onChange={setSearch}
            onSearch={(keyword) => {
              console.log('search keyword:' + keyword)
            }}
          />
        </ToolBar>

        <Divider>SearchBar Invert</Divider>
        <ToolBar invert>
          <ToolBar.Search
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
