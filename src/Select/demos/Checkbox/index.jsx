import React, { useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([
    {
      id: '1',
      name: '选项1'
    }
  ])
  return (
    <>
      <Select.Checkbox
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
        onChange={setValue}
        onVisibleChange={(visible) => {
          console.log(visible)
        }}
      />
    </>
  )
}
