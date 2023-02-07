import React, { useState } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const list = useState([
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ])
  const [value, setValue] = useState(null)
  return (
    <>
      <Picker.Modal visible={true} value={value} list={list} onChange={setValue} />
    </>
  )
}
