import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputNumberRef = useRef(null)
  const [value, setValue] = useState(10.12341234)
  useEffect(() => {
    console.log(inputNumberRef.current.correctValue('134.1212'))
  }, [])
  return (
    <>
      <Input.AutoFit placeholder="AutoFit" defaultValue={value} allowClear={true} />
      <Input.Text placeholder="Text" defaultValue={value} allowClear={true} />
      <Input.Number
        ref={inputNumberRef}
        // readOnly
        precision={2}
        allowClear={true}
        // defaultValue={value}
        value={value}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
