import React, { useState, useEffect } from 'react'
import { Layout, Loading } from 'seedsui-react'

export default () => {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      Loading.show({
        content: 'abc',
        onVisibleChange: (visible) => {
          console.log('visible:', visible)
        }
      })
    }, 5000)
  }, [])

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Customer.Loading</Layout.Header>
      <Layout.Main className="bg-white">
        <Loading />
      </Layout.Main>
    </Layout>
  )
}
