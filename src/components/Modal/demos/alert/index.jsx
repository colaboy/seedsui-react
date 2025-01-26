import React from 'react'
import { Layout, Modal, Button } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Modal.alert({
      content: 'alert content'
    })
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Modal.alert</Layout.Header>
      <Layout.Main className="bg-white">
        <Button className="flex l primary" onClick={handleToggle}>
          Modal visible toggle
        </Button>
      </Layout.Main>
    </Layout>
  )
}
