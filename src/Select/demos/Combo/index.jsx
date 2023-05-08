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
      <Select.Combo
        allowClear="exclusion-ricon"
        riconProps={{
          className: 'icon shape-arrow-right sm'
        }}
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
        // multiple={true}
        onChange={setValue}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        captionProps={{
          caption: '选择'
        }}
      />
    </>
  )
}
