import React, { useRef, useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const selectRef = useRef(null)
  const [value, setValue] = useState([
    {
      id: '1',
      name: '选项1'
    }
  ])
  return (
    <>
      <Select.Main
        ref={selectRef}
        multiple={false}
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
      />
    </>
  )
}
