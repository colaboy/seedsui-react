import React, { useRef, useState } from 'react'
import { Layout, Calendar } from 'seedsui-react'
import People from './People'

export default () => {
  const [value, setValue] = useState(null)
  const calendarTypeRef = useRef('week')
  return (
    <Layout className="full">
      <Layout.Header className="text-center">Employee.Combo</Layout.Header>
      <People
        prepend={({ list, value, onChange }) => {
          return (
            <Calendar
              type="week"
              style={{ flex: 'none' }}
              onSlideChange={(date, { type }) => {
                console.log(type)
                calendarTypeRef.current = type
              }}
            />
          )
        }}
        virtual={{
          getPrependHeight: () => {
            if (calendarTypeRef.current === 'month') {
              return 338
            }
            return 138
          },
          getItemHeight: (item) => {
            if (item?.virtualData?.type === 'group') {
              return 33
            }
            return 71
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
