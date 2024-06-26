import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Layout, Bridge, Button } from 'seedsui-react'

export default () => {
  const { Main } = Layout

  useEffect(() => {
    Bridge.getLocation({
      // type: 'gcj02',
      success: (result) => {
        console.log(result)
      }
    })
    Bridge.ready(() => {
      console.log(window.top.wx)
    })
  }, [])
  return createPortal(
    // <div id="root" style={{ height: '300px', position: 'relative' }}>
    <Layout className="full">
      <Main>
        <Button
          className="primary l flex"
          onClick={() => {
            Bridge.closeWindow()
          }}
        >
          退出当前页
        </Button>
      </Main>
    </Layout>,
    // </div>
    document.body
  )
}
