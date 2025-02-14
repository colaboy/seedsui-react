import React from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Main</Layout.Header>
      <List.Main
        pagination
        list={list}
        onChange={(value) => {
          console.log(value)
        }}
      />
    </Layout>
  )
}
