import React, { useState, useEffect } from 'react'
import { Picker } from 'seedsui-react'

export default () => {
  const [list, setList] = useState([])
  const [value, setValue] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setList([{ id: '1', name: '1' }])
    }, 1000)
  }, [])
  return (
    <>
      <Picker.Combo placeholder="Please select" value={value} list={list} onChange={setValue} />
    </>
  )
}
