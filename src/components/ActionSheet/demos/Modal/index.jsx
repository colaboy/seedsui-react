import React, { useState } from 'react'
import { ActionSheet } from 'seedsui-react'

export default () => {
  const list = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState(null)
  return (
    <>
      <ActionSheet.Modal
        visible={true}
        value={value}
        list={list}
        onChange={(newValue) => {
          console.log('onChange:', newValue)
          setValue(newValue)
        }}
      />
    </>
  )
}
