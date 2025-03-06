import React, { useState } from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Modal</Layout.Header>
      <Layout.Main>
        <List.Modal
          visible={true}
          pagination
          value={value}
          loadList={() => list}
          onChange={(value) => {
            console.log(value)
            setValue(value)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
