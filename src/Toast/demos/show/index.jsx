import React from 'react'
import { Layout, Toast } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Toast.show({
      content: 'show toast',
      duration: 500,
      onVisibleChange: (visible) => {
        console.log('visible:', visible)
      }
    })
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Toast.show</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Toast visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
