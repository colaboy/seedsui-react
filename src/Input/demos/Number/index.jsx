import React, { useState, useRef } from 'react'
import { Input } from 'seedsui-react'

export default () => {
  const inputNumberRef = useRef(null)
  const [value, setValue] = useState(10.12341234)

  useEffect(() => {
    console.log(inputNumberRef.current.correctValue('134.1212'))
  }, [])
  return (
    <>
      <Input.Number
        value={value}
        onChange={(val) => {
          console.log(val)
          setValue(val)
        }}
      />
    </>
  )
}
