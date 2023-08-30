import React, { useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  const alertRef = useRef(null)

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Layout className="full">
        <Layout.Header className="text-center">Modal.Alert</Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Confirm
            ref={alertRef}
            visible={true}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
            }}
          >
            Test content
          </Modal.Confirm>
        </Layout.Main>
      </Layout>
    </div>
  )
}
