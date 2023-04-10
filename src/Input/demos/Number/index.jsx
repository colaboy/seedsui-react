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
        // defaultValue={value}
        value={value}
        precision={2}
        maxLength={8}
        onChange={(val) => {
          console.log('得到的值:', val)
          setValue(val)
        }}
      />
    </>
  )
}
