import React, { useState } from 'react'
import { Layout } from 'seedsui-react'
import { Transfer } from 'seedsui-react'
// import Transfer from 'library/components/Transfer'

export default () => {
  const [value, setValue] = useState([
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">Transfer.Main</Layout.Header>
      <div className="demo-title">Transfer List</div>
      <Transfer.Main
        list={[
          { id: '1', name: '1' },
          { id: '2', name: '2' },
          { id: '3', name: '3' },
          { id: '4', name: '4' },
          { id: '5', name: '5' },
          { id: '6', name: '6' }
        ]}
        value={value}
        titles={['标题1', '标题2']}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
      />
    </Layout>
  )
}
