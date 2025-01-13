import React, { useState } from 'react'
import Tabs from 'library/components/Tabs'

export default () => {
  const list = [
    {
      name: '中华人民共和国',
      dateType: '0'
    },
    { name: '季', dateType: '1' },
    { name: '年', dateType: '2' }
  ]
  const [value, setValue] = useState({ name: '季', dateType: '0' })

  function handleChange(value) {
    setValue(value)
  }
  return (
    <>
      <Tabs
        className="tabs-line tabs-line-width-percent80 border-b"
        // style={{ height: 100 }}
        list={list}
        value={value}
        onChange={(newValue) => {
          console.log(newValue)
          handleChange(newValue)
        }}
      />
    </>
  )
}
