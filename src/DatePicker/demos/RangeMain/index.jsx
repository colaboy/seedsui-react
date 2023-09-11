import React, { useState } from 'react'
import { Layout } from 'seedsui-react'
import { DatePicker } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([new Date(), new Date()])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">日期快捷选择</Layout.Header>
      <Layout.Main className="bg-white">
        <DatePicker.RangeMain
          titles={{
            custom: '自定义选择',
            selector: '快捷选择'
          }}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            setValue(newValue)
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
