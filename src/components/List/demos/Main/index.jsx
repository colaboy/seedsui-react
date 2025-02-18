import React, { useState } from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Main</Layout.Header>
      <List.Main
        prepend={({ list, value, onChange, pagination }) => {
          console.log({ list, value, onChange, pagination })
          return <div>Custom prepend</div>
        }}
        pagination
        value={value}
        list={'错误'}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
      />
    </Layout>
  )
}
