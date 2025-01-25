import React, { useState } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState('2.10')
  return (
    <>
      <Input.NumberBox
        placeholder="Input"
        value={value}
        onChange={setValue}
        precision={2}
        maxLength={8}
        min={0.1}
        trim={true}
        allowClear
        // formatter={(num) => {
        //   if (!num) return num
        //   return parseFloat(num)
        // }}
        // onChange={(val) => {
        //   console.log('得到的值:', val)
        //   setValue(val)
        // }}
      />
    </>
  )
}
