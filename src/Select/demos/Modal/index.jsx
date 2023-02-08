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
      <Select.Modal
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
        visible={true}
        onChange={setValue}
        onVisibleChange={(visible) => {
          console.log(visible)
        }}
      />
    </>
  )
}
