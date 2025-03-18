import React, { useState, useRef } from 'react'
import { Layout, Modal, SafeArea } from 'seedsui-react'

SafeArea.autoSafeArea({ debug: true })

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
      <Layout.Main>
        <div ref={referenceRef} className="demo-title" onClick={handleToggle}>
          Modal visible toggle
        </div>
        <Modal.FilterCombo
          // combo={<div>Custom target</div>}
          onConfig={() => {
            console.log('setting')
          }}
          onOk={() => {
            console.log('ok')
          }}
          // onReset={() => {
          //   console.log('reset')
          // }}
        >
          <div className="bg-white" style={{ height: '300px' }}>
            Modal Content
          </div>
        </Modal.FilterCombo>
      </Layout.Main>
    </Layout>
  )
}
