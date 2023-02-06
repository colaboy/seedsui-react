import React from 'react'
import { Layout } from 'seedsui-react'

export default () => {
  const { Header, Footer, Aside, Main } = Layout
  return (
    <div id="root" style={{ height: '300px', position: 'relative' }}>
      <Layout className="full">
        <Main>
          <div>橙色</div>
          <div style={{ height: '50px', backgroundColor: 'yellow', position: 'sticky', top: 0 }}>
            吸顶
          </div>
          <div style={{ height: '500px', backgroundColor: 'green' }}>正常</div>
        </Main>
      </Layout>
    </div>
  )
}
