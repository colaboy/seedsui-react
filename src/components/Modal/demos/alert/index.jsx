import React from 'react'
import { Layout, Modal } from 'seedsui-react'

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
        <div className="demo-title" onClick={handleToggle}>
          Modal visible toggle
        </div>
        <iframe src="http://localhost:8000/seedsui-react/~demos/src-modal-demo-confirm?" />
      </Layout.Main>
    </Layout>
  )
}
