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
          // daysLimit={3}
          modal="modal"
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
