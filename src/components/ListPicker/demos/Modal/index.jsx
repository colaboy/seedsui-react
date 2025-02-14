import React from 'react'
import App from 'library/components/App'
import { Layout } from 'seedsui-react'
import { ListPicker } from 'qince-h5-library'
// import ListPicker from 'library/components/ListPicker'
import list from './../data'

export default () => {
  return (
    <App
      config={{
        auth: {
          visibleError: false
        },
        loginUser: {
          load: false
        },
        appParameters: {
          load: false
        }
      }}
    >
      <Layout className="full">
        <Layout.Header className="text-center">ListPicker.Modal</Layout.Header>
        <Layout.Main className="bg-white">
          <div className="demo-title">ListPicker Modal</div>
          <ListPicker.Modal
            visible={true}
            multiple={true}
            pagination
            list={list}
            onChange={(value) => {
              console.log(value)
            }}
          />
        </Layout.Main>
      </Layout>
    </App>
  )
}
