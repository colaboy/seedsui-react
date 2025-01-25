import React, { useEffect, useState, useRef } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputNumberRef = useRef(null)
  const [value, setValue] = useState('100.000')

  useEffect(() => {
    console.log(inputNumberRef.current)
  }, [])
  return (
    <>
      <Input.Number
        ref={inputNumberRef}
        placeholder="Input"
        value={value}
        onChange={setValue}
        precision={2}
        maxLength={8}
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
