import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Layout, Page, SafeArea } from 'seedsui-react'

export default () => {
  const { Header, Footer, Aside, Main } = Layout
  useEffect(() => {
    document.getElementById('root').parentElement.removeChild(document.getElementById('root'))
  }, [])
  return createPortal(
    // <div id="root" style={{ height: '300px', position: 'relative' }}>
    <Layout className="full" safeArea={false}>
      <Header style={{ height: '44px', backgroundColor: '#7dbcea' }}>Header</Header>
      {/* <Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Main</Main> */}
      <Layout>
        <Aside style={{ width: '80px', backgroundColor: '#3ba0e9' }}>Aside</Aside>
        <Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Main</Main>
      </Layout>
      <Footer style={{ height: '44px', backgroundColor: '#7dbcea' }}>Footer</Footer>
      <SafeArea />
    </Layout>,
    // </div>
    document.body
  )
}
