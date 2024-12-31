import React, { useState, useEffect } from 'react'
import { Layout, Loading } from 'seedsui-react'

export default () => {
  const [visible, setVisible] = useState(true)
  // useEffect(() => {
  //   setTimeout(() => {
  //     Loading.show({
  //       captionProps: {
  //         caption: ''
  //       },
  //       onVisibleChange: (visible) => {
  //         console.log('visible:', visible)
  //         setTimeout(() => {
  //           Loading.hide()
  //         }, 3000)
  //       }
  //     })
  //   }, 2000)
  // }, [])

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Customer.Loading</Layout.Header>
      <Layout.Main className="bg-white">
        <Loading content="自定义内容" />
      </Layout.Main>
    </Layout>
  )
}
