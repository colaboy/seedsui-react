import React, { useState } from 'react'
import { Layout } from 'seedsui-react'
import People from './People'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <Layout className="full">
      <Layout.Header className="text-center">Employee.Combo</Layout.Header>
      <People
        virtual={{
          getItemHeight: (item) => {
            if (item?.virtualData?.type === 'group') {
              return 30
            }
            return 80
          }
        }}
        // multiple={true}
        // checkable={false}
        allowClear={true}
        value={value}
        onChange={(value, { checked, item }) => {
          console.log(value, { checked, item })
          setValue(value)
        }}
      />
    </Layout>
  )
}
