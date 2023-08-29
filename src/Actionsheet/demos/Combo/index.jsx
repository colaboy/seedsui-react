import React, { useState } from 'react'
import { Actionsheet } from 'seedsui-react'

export default () => {
  const list = [
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' },
    { id: '1', name: '测试' },
    { id: '2', name: '测试' }
  ]
  const [value, setValue] = useState(null)
  return (
    <>
      <Actionsheet.Combo
        placeholder="Please select"
        value={value}
        list={list}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </>
  )
}
