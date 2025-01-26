import React, { useEffect, useState, useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

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
          Modal.Confirm
        </Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Confirm
            ref={confirmRef}
            visible={visible}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
              setVisible(visible)
            }}
            captionProps={{
              caption: '标题'
            }}
            okProps={{
              caption: '确定',
              onClick: (e) => {
                console.log('ok')
                return false
              }
            }}
          >
            Test content
          </Modal.Confirm>
        </Layout.Main>
      </Layout>
    </div>
  )
}
