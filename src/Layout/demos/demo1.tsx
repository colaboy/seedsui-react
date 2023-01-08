import React from 'react'
import { Layout } from 'seedsui-react'

export default () => {
  const { Header, Footer, Aside, Main } = Layout
  return (
    <div id="root" style={{ height: '300px', position: 'relative' }}>
      <Layout className="full">
        <Header style={{ height: '44px', backgroundColor: '#7dbcea' }}>Header</Header>
        {/* <Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Main</Main> */}
        <Layout>
          <Aside style={{ width: '80px', backgroundColor: '#3ba0e9' }}>Aside</Aside>
          <Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Main</Main>
        </Layout>
        <Footer style={{ height: '44px', backgroundColor: '#7dbcea' }}>Footer</Footer>
      </Layout>
    </div>
  )
}
