import React, { useEffect, useRef, useState } from 'react'
import { Checkbox } from 'seedsui-react'

export default () => {
  const checkboxRef = useRef(null)
  const [list, setList] = useState([
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6', name: '6' },
    { id: '7', name: '7' },
    { id: '8', name: '8' },
    { id: '9', name: '9' },
    { id: '10', name: '10' }
  ])
  const [value, setValue] = useState(null)

  return (
    <>
      <Checkbox.Group
        ref={checkboxRef}
        // allowClear
        multiple={false}
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
