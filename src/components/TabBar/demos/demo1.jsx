import React, { useState } from 'react'
import { Layout, Divider, TabBar } from 'seedsui-react'

export default () => {
  const list = [
    {
      name: '中华人民共和国',
      dateType: '0'
    },
    { name: '季', dateType: '1' },
    { name: '年', dateType: '2' }
  ]
  const [value, setValue] = useState({ name: '季', dateType: '0' })

  function handleChange(value) {
    setValue(value)
  }
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>Fill Mode</Divider>
        <TabBar.Lin
          // style={{ height: 100 }}
          list={list}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <TabBar
          className="tabbar-line tabbar-line-width-percent80 border-b"
          // style={{ height: 100 }}
          list={list}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
