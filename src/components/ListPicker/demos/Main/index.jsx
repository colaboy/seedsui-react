import React from 'react'
import App from 'library/components/App'
import { Layout } from 'seedsui-react'
import ListPicker from 'library/components/ListPicker'
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
        <Layout.Header className="text-center">ListPicker.Main</Layout.Header>
        <ListPicker.Main
          pagination
          className="flex flex-vertical"
          messageProps={{
            className: 'flex-1'
          }}
          checkable={false}
          list={[]}
          onChange={(value) => {
            console.log(value)
          }}
        />
        <Layout.Footer>
          <ListPicker.Summary
            // gap={内部元素间距}
            // url="点击显示合计"
            // params={}
            style={{ padding: '10px 12px' }}
            className="bg-white"
            // formatter={(value) => {
            //   console.log('格式化:', value)
            //   return <>h:{value}</>
            // }}
            data={[
              { id: 'count_total', name: '合计数量', value: '1' },
              { id: 'weight_total', name: '重量', value: '2' },
              { id: 'amount_total', name: '金额', value: '3', type: 'amount', noStyle: false }
            ]}
          />
        </Layout.Footer>
      </Layout>
    </App>
  )
}
