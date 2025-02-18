import React, { useState, useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  const referenceRef = useRef(null)
  const modalRef = useRef(null)
  const [visible, setVisible] = useState(false)
  function handleToggle() {
    setVisible(!visible)
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Modal</Layout.Header>
      <Layout.Main className="bg-white">
        <div ref={referenceRef} className="demo-title" onClick={handleToggle}>
          Modal visible toggle
        </div>
        <Modal.FilterModal
          visible={true}
          onConfig={() => {
            console.log('setting')
          }}
          onReset={() => {
            console.log('reset')
          }}
        >
          <div className="bg-white" style={{ height: '300px' }}>
            Test
          </div>
        </Modal.FilterModal>
      </Layout.Main>
    </Layout>
  )
}
