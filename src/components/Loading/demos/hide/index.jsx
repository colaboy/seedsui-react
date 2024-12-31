import React from 'react'
import { Layout, Loading } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Loading.show()
    setTimeout(() => {
      Loading.hide()
    }, 500)
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Loading.hide</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Loading visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
