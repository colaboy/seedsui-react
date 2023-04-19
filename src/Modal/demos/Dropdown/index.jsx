import React, { useRef } from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  const dropdown1Ref = useRef(null)
  const dropdown2Ref = useRef(null)

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Layout className="full">
        <Layout.Header className="text-center">Customer.Dropdown</Layout.Header>
        <Layout.Main className="bg-white">
          <Modal.Dropdown
            ref={dropdown1Ref}
            maskClosable
            onBeforeOpen={() => {
              if (document.querySelector('.mask.active')) {
                dropdown1Ref.current.close()
                dropdown2Ref.current.close()
                return false
              }
              return true
            }}
            onVisibleChange={(visible) => {
              console.log('是否显示1:', visible)
            }}
            title="Dropdown visible toggle1"
          >
            Test content
          </Modal.Dropdown>
          <Modal.Dropdown
            ref={dropdown2Ref}
            maskClosable
            onBeforeOpen={() => {
              if (document.querySelector('.mask.active')) {
                dropdown1Ref.current.close()
                dropdown2Ref.current.close()
                return false
              }
              return true
            }}
            onVisibleChange={(visible) => {
              console.log('是否显示2:', visible)
            }}
            title="Dropdown visible toggle2"
          >
            Test content
          </Modal.Dropdown>
        </Layout.Main>
      </Layout>
    </div>
  )
}
