import React, { useEffect, useState, useRef } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputNumberRef = useRef(null)
  const [value, setValue] = useState(10.12341234)

  useEffect(() => {
    console.log(inputNumberRef.current)
  }, [])
  return (
    <>
      <Input.Number
        ref={inputNumberRef}
        value={value}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
