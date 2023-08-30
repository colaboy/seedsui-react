import React, { useEffect, useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  const alertRef = useRef(null)

  useEffect(() => {
    console.log(alertRef)
  }, [])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Layout className="full">
        <Layout.Header className="text-center">Modal.Alert</Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Alert
            ref={alertRef}
            visible={true}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
            }}
          >
            Test content
          </Modal.Alert>
        </Layout.Main>
      </Layout>
    </div>
  )
}
