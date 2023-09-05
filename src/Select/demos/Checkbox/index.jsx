import React, { useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)
  return (
    <>
      <Select.Checkbox
        allowClear
        // readOnly
        // disabled
        // multiple
        placeholder="Please select"
        value={value}
        list={[
          {
            id: '1',
            name: '选项1'
          },
          {
            id: '2',
            name: '选项2'
          }
        ]}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
        onVisibleChange={(visible) => {
          console.log(visible)
        }}
      />
    </>
  )
}
