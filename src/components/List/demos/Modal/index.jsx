import React from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Modal</Layout.Header>
      <Layout.Main className="bg-white">
        <List.Modal
          visible={true}
          multiple={true}
          pagination
          list={list}
          onChange={(value) => {
            console.log(value)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
