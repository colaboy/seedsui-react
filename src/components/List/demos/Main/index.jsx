import React, { useRef, useState } from 'react'
import { Layout, List } from 'seedsui-react'
import list from './../data'

export default () => {
  const mainRef = useRef(null)
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">List.Main</Layout.Header>
      <List.Main
        ref={mainRef}
        prepend={({ list, value, onChange, pagination }) => {
          console.log({ list, value, onChange, pagination })
          return <div>Custom prepend</div>
        }}
        pagination
        value={value}
        reload={true}
        loadList={() => '错误'}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
      />
    </Layout>
  )
}
