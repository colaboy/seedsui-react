import React, { useState } from 'react'
import { Actionsheet } from 'seedsui-react'

export default () => {
  const list = [
    { id: '1', name: <div>测试Node</div> },
    { id: '2', name: '测试' },
    { id: '3', name: '测试' },
    { id: '4', name: '测试' },
    { id: '5', name: '测试' },
    { id: '6', name: '测试' },
    { id: '7', name: '测试' },
    { id: '8', name: '测试' },
    { id: '9', name: '测试' },
    { id: '10', name: '测试' },
    { id: '11', name: '测试' },
    { id: '12', name: '测试' },
    { id: '13', name: '测试' },
    { id: '14', name: '测试' },
    { id: '15', name: '测试' },
    { id: '16', name: '测试' }
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
