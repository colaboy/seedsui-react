import React from 'react'

import { Layout, NavBar, Divider } from 'seedsui-react'

export default () => {
  return (
    <Layout className="full">
      <Layout.Main>
        <Divider>SearchBar</Divider>
        <NavBar>
          <NavBar.Button icon="seeds-icon-arrow-left">Back</NavBar.Button>
          <NavBar.Title>Title</NavBar.Title>
          <NavBar.Button icon="seeds-icon-ok-fill" iconPosition="right">
            Ok
          </NavBar.Button>
        </NavBar>
      </Layout.Main>
    </Layout>
  )
}
