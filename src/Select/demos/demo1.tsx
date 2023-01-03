import React, { useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <>
      <Select.Checkbox
        placeholder="Please select"
        value={value}
        list={[
          {
            id: '1',
            name: '1'
          },
          {
            id: '2',
            name: '2'
          }
        ]}
        onChange={setValue}
        onVisibleChange={(visible) => {
          debugger
        }}
      />
    </>
  )
}
