import React, { useState } from 'react'
import { Selector } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([
    {
      id: '1',
      name: '选项1'
    }
  ])

  return (
    <>
      <Selector
        columns={3}
        // allowClear
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
          },
          {
            id: '3',
            name: '选项3'
          },
          {
            id: '4',
            name: '选项4'
          },
          {
            id: '5',
            name: '选项5'
          }
        ]}
        // multiple={true}
        onChange={setValue}
      />
    </>
  )
}
