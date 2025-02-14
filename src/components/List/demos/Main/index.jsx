import React, { useState } from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Main</Layout.Header>
      <List.Main
        pagination
        value={value}
        list={list}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
      />
    </Layout>
  )
}
