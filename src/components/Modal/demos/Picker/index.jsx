import React, { useEffect, useState, useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'
import CustomMain from './CustomMain'

export default () => {
  const confirmRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log(confirmRef)
  }, [])

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Layout className="full">
        <Layout.Header className="text-center" onClick={() => setVisible(!visible)}>
          Modal.Picker
        </Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Picker
            ref={confirmRef}
            visible={visible}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
              setVisible(visible)
            }}
            captionProps={{
              caption: '标题'
            }}
          >
            <CustomMain />
          </Modal.Picker>
        </Layout.Main>
      </Layout>
    </div>
  )
}
