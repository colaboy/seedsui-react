import React from 'react'
import { Layout, Toast } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Toast.show({
      content: 'show toast'
    })
    setTimeout(() => {
      Toast.hide()
    }, 500)
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Toast.hide</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Toast visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
