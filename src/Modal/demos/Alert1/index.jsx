import React, { useEffect, useState, useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  const alertRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log(alertRef)
  }, [])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Layout className="full">
        <Layout.Header className="text-center" onClick={() => setVisible(!visible)}>
          Modal.Alert
        </Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Alert
            ref={alertRef}
            captionProps={{
              caption: '标题'
            }}
            visible={visible}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
              setVisible(visible)
            }}
          >
            Test content
          </Modal.Alert>
        </Layout.Main>
      </Layout>
    </div>
  )
}
