import React, { useState } from 'react'
import { Select } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState([
    {
      id: '选项1',
      name: '选项1'
    },
    {
      id: '选项2',
      name: '选项2'
    }
  ])
  return (
    <>
      <Select.Combo
        // autoSize
        // disabled="exclusion-ricon"
        allowClear="exclusion-ricon"
        riconProps={{
          className: 'icon shape-arrow-right sm'
        }}
        placeholder="Please select"
        value={value}
        list={[
          {
            id: '选项1',
            name: '选项1'
          },
          {
            id: '选项2',
            name: '选项2'
          },
          {
            id: '3',
            name: '选项5'
          },
          {
            id: '4',
            name: '选项5'
          },
          {
            id: '5',
            name: '选项5'
          },
          {
            id: '6',
            name: '选项6'
          },
          {
            id: '7',
            name: '选项7'
          },
          {
            id: '8',
            name: '选项8'
          },
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
            name: '选项5'
          },
          {
            id: '4',
            name: '选项5'
          },
          {
            id: '5',
            name: '选项5'
          },
          {
            id: '6',
            name: '选项6'
          },
          {
            id: '7',
            name: '选项7'
          },
          {
            id: '8',
            name: '选项8'
          }
        ]}
        multiple={true}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
        captionProps={{
          caption: '选择'
        }}
        // 选中效果: checkbox | tick | corner
        checkedType="checkbox"
        checkedPosition="right"
      />
    </>
  )
}
